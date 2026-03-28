export interface NotionItem {
  id: string;
  name: string;
  slug: string;
  brand: string;
  price: string;
  desc: string;
  image: string;
  images?: string[];
  category: string;
  type: string;
  specs: Record<string, string>;
}

function getPropString(prop: any): string {
  if (!prop) return "";
  if (prop.type === "title") return prop.title?.map((t: any) => t.plain_text).join("") || "";
  if (prop.type === "rich_text") return prop.rich_text?.map((t: any) => t.plain_text).join("") || "";
  if (prop.type === "select") return prop.select?.name || "";
  if (prop.type === "multi_select") return prop.multi_select?.map((s: any) => s.name).join(", ") || "";
  if (prop.type === "number") return prop.number?.toString() || "";
  if (prop.type === "url") return prop.url || "";
  if (prop.type === "files") {
    const file = prop.files?.[0];
    if (!file) return "";
    return file.file?.url || file.external?.url || "";
  }
  return "";
}

function getPropFilesArray(prop: any): string[] {
  if (!prop || prop.type !== "files" || !prop.files) return [];
  return prop.files.map((f: any) => f.file?.url || f.external?.url).filter(Boolean);
}

// ARTIK SLUG'LARI ID İLE BİRLEŞTİRİP BENZERSİZ YAPIYORUZ
function generateUniqueSlug(name: string, id: string): string {
  const baseSlug = name.toLowerCase()
    .replace(/[^a-z0-9ğüşıöç]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  // Notion ID'sinin son 4 hanesini alıp sona ekliyoruz
  const shortId = id.slice(-4); 
  return `${baseSlug}-${shortId}`;
}

export function normalizeType(text?: string): string {
  if (!text) return "";
  try { text = decodeURIComponent(text); } catch (e) {}
  return text.toLowerCase().trim()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '');
}

export async function fetchAllItems(): Promise<NotionItem[]> {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const secret = process.env.NOTION_SECRET;

  if (!databaseId || !secret) return [];

  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${secret}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
      next: { revalidate: 0 }
    });

    if (!res.ok) return [];

    const data = await res.json();

    return data.results.map((page: any) => {
      const props = page.properties;
      const name = getPropString(props['Name']) || getPropString(props['Ad']) || "İsimsiz Ürün";
      
      const rawPrice = getPropString(props['Price']) || getPropString(props['Fiyat']);
      const formattedPrice = rawPrice ? (rawPrice.includes("₺") ? rawPrice : `₺${rawPrice}`) : "";
      
      const cat = getPropString(props['Kategori']).toLowerCase().trim();
      const typeStr = getPropString(props['Tür 1']) || getPropString(props['Tür1']) || getPropString(props['Tür']) || "";
      
      const galleryFiles = getPropFilesArray(props['Image'] || props['Galeri'] || props['Gallery'] || props['Dosyalar & Medya']);
      const mainImage = galleryFiles[0] || "/logo.png";
      
      const reservedKeys = ["Name", "Ad", "Price", "Fiyat", "Description", "Açıklama", "Image", "Görsel (URL)", "Slug", "Marka", "Status", "Kategori", "Tür", "Tür 1", "Tür1", "Type", "Galeri", "Gallery", "Dosyalar & Medya"];
      const specs: Record<string, string> = {};
      
      for (const [key, prop] of Object.entries(props)) {
        if (!reservedKeys.includes(key)) {
           const val = getPropString(prop);
           if (val) specs[key] = val;
        }
      }

      return {
        id: page.id,
        name,
        // BURASI ÇOK ÖNEMLİ: Eğer Notion'da manuel slug yoksa otomatik benzersiz slug oluşturur
        slug: getPropString(props['Slug']) || generateUniqueSlug(name, page.id),
        brand: getPropString(props['Marka']),
        price: formattedPrice,
        desc: getPropString(props['Description']) || getPropString(props['Açıklama']),
        image: mainImage,
        images: galleryFiles,
        category: cat,
        type: typeStr,
        specs,
      };
    });
  } catch (error) {
    return [];
  }
}

export async function getAllProducts() {
  const items = await fetchAllItems();
  return items.filter(item => item.category.includes("ürün") || item.category === ""); 
}

export async function getAllProjects() {
  const items = await fetchAllItems();
  return items.filter(item => item.category.includes("proje"));
}

export async function getItemBySlug(slug: string) {
  const items = await fetchAllItems();
  return items.find(item => item.slug === slug) || null;
}

export async function getUniqueBrands() {
  const products = await getAllProducts();
  const brands = products.map(p => p.brand).filter(b => b);
  return Array.from(new Set(brands));
}

export function slugifyBrand(text: string): string {
  return text.toLowerCase().trim()
    .replace(/[^a-z0-9ğüşıöç]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function getProductsByBrandSlug(brandSlug: string) {
  const products = await getAllProducts();
  return products.filter(p => p.brand && slugifyBrand(p.brand) === brandSlug);
}