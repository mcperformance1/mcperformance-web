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
  type1: string;
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

// --- DOSYALARIN HEPSİNİ ÇEKEN KRİTİK FONKSİYON ---
function getPropFilesArray(prop: any): string[] {
  if (!prop) return [];
  if (prop.type === "files" && prop.files) {
    return prop.files.map((f: any) => f.file?.url || f.external?.url).filter(Boolean);
  }
  if (prop.type === "url" && prop.url) return [prop.url];
  return [];
}

function generateUniqueSlug(name: string, id: string): string {
  const trMap: { [key: string]: string } = {
    'ğ': 'g', 'ü': 'u', 'ş': 's', 'ı': 'i', 'ö': 'o', 'ç': 'c',
    'Ğ': 'g', 'Ü': 'u', 'Ş': 's', 'İ': 'i', 'Ö': 'o', 'Ç': 'c'
  };
  let cleanName = name;
  Object.keys(trMap).forEach(key => { cleanName = cleanName.replaceAll(key, trMap[key]); });
  const baseSlug = cleanName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const shortId = id.slice(-4); 
  return `${baseSlug}-${shortId}`;
}

export function normalizeType(text?: string): string {
  if (!text) return "";
  try { text = decodeURIComponent(text); } catch (e) {}
  const trMap: { [key: string]: string } = { 'ğ': 'g', 'ü': 'u', 'ş': 's', 'ı': 'i', 'ö': 'o', 'ç': 'c' };
  let cleanText = text.toLowerCase().trim();
  Object.keys(trMap).forEach(key => { cleanText = cleanText.replaceAll(key, trMap[key]); });
  return cleanText.replace(/[^a-z0-9]/g, '');
}

/** Menü etiketleri ↔ Notion Tür / Tür 1 farklarını kapatır */
function expandTypeAliases(raw: string): string[] {
  const aliases = new Set<string>([raw]);
  if (raw === "jantvespacer" || raw === "jantspacer") {
    aliases.add("jantvespacer");
    aliases.add("jantspacer");
  }
  if (raw === "stspacerbijon" || raw === "stspacerandbijon") {
    aliases.add("stspacerbijon");
  }
  if (raw === "braidwheels" || raw === "braid") {
    aliases.add("braidwheels");
    aliases.add("braid");
    aliases.add("motorsport");
  }
  return Array.from(aliases);
}

function fieldMatchesQuery(field: string, query: string): boolean {
  if (!field || !query) return false;
  return field === query || field.includes(query) || query.includes(field);
}

/** tur / tur1 → Notion Tür + Tür 1 (Braid için Marka da bakılır) */
export function productMatchesTypeFilters(
  product: Pick<NotionItem, "type" | "type1" | "brand">,
  tur?: string,
  tur1?: string
): boolean {
  const rawTur = normalizeType(tur);
  const rawTur1 = normalizeType(tur1);
  if (!rawTur && !rawTur1) return true;

  const pType = normalizeType(product.type);
  const pType1 = normalizeType(product.type1);
  const pBrand = normalizeType(product.brand);
  const typeFields = [pType, pType1].filter(Boolean);

  const matchesQueries = (queries: string[]) =>
    queries.some((q) => {
      if (typeFields.some((field) => fieldMatchesQuery(field, q))) return true;
      // Sadece Braid menü/marka eşleşmesi
      if ((q === "braidwheels" || q === "braid") && pBrand.includes("braid")) return true;
      return false;
    });

  if (rawTur && !matchesQueries(expandTypeAliases(rawTur))) return false;
  if (rawTur1 && !matchesQueries(expandTypeAliases(rawTur1))) return false;

  return true;
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
      
      const mainImage = getPropString(props['Image']) || getPropString(props['Görsel (URL)']) || "/logo.png";
      
      // --- BURAYI GÜNCELLEDİM KANKA ---
      // Artık galleryImages içindeki tüm JPEG/PNG dosyalarını liste olarak alıyor
      const galleryUrls = getPropFilesArray(props['galleryImages']);
      
      const filteredGallery = galleryUrls.filter(img => 
        img && !img.toLowerCase().includes('logo.png') && !img.toLowerCase().includes('image_6.png')
      );
      
      const rawPrice = getPropString(props['Price']) || getPropString(props['Fiyat']);
      const formattedPrice = rawPrice ? (rawPrice.includes("₺") ? rawPrice : `₺${rawPrice}`) : "";
      const cat = getPropString(props['Kategori']).toLowerCase().trim();
      const typeStr = getPropString(props['Tür']) || "";
      const type1Str = getPropString(props['Tür 1']) || getPropString(props['Tür1']) || "";
      
      const reservedKeys = ["Name", "Ad", "Price", "Fiyat", "Description", "Açıklama", "Image", "Görsel (URL)", "Slug", "Marka", "Status", "Kategori", "Tür", "Tür 1", "Tür1", "Type", "Galeri", "Gallery", "Dosyalar & Medya", "galleryImages"];
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
        slug: generateUniqueSlug(name, page.id),
        brand: getPropString(props['Marka']),
        price: formattedPrice,
        desc: getPropString(props['Description']) || getPropString(props['Açıklama']),
        image: mainImage,
        images: filteredGallery, // Burası artık tek bir string değil, tam bir liste!
        category: cat,
        type: typeStr,
        type1: type1Str,
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
  const cleanSearchSlug = decodeURIComponent(slug).toLowerCase();
  return items.find(item => item.slug === cleanSearchSlug) || null;
}

export async function getUniqueBrands() {
  const products = await getAllProducts();
  const brands = products.map(p => p.brand).filter(b => b);
  return Array.from(new Set(brands));
}

export function slugifyBrand(text: string): string {
  return text.toLowerCase().trim().replace(/[^a-z0-9ğüşıöç]+/g, '-').replace(/^-+|-+$/g, '');
}

export async function getProductsByBrandSlug(brandSlug: string) {
  const products = await getAllProducts();
  return products.filter(p => {
    if (!p.brand) return false;
    const cleanBrand = slugifyBrand(p.brand);
    if (brandSlug === "braid-wheels" || brandSlug === "braid") {
      return cleanBrand === "braid-wheels" || cleanBrand === "braid";
    }
    return cleanBrand === brandSlug;
  });
}