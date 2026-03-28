import { Client } from '@notionhq/client';

if (!process.env.NOTION_SECRET || !process.env.NOTION_DATABASE_ID) {
  console.warn("Missing NOTION_SECRET or NOTION_DATABASE_ID in .env.local");
}

export const notion = new Client({ auth: process.env.NOTION_SECRET });
export const databaseId = process.env.NOTION_DATABASE_ID!;

export interface NotionItem {
  id: string;
  name: string;
  slug: string;
  brand: string;
  price: string;
  desc: string;
  image: string;
  category: string;
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
  if (prop.type === "files") return prop.files?.[0]?.file?.url || prop.files?.[0]?.external?.url || "";
  return "";
}

function generateSlug(text: string): string {
  return text.toLowerCase()
    .replace(/[^a-z0-9ğüşıöç]+/g, '-') // Handle Turkish chars
    .replace(/^-+|-+$/g, '');
}

export async function fetchAllItems(): Promise<NotionItem[]> {
  if (!databaseId || !process.env.NOTION_SECRET) {
     throw new Error("Vercel'de NOTION_SECRET veya NOTION_DATABASE_ID eksik! Lütfen Vercel Environment Variables ayarlarını kontrol edin.");
  }
  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NOTION_SECRET}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({}),
      cache: "no-store" // ensure we don't serve stale Notion data locally if dev caching triggers
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Notion API Bağlantı Hatası: ${errorText}. Lütfen Vercel'deki şifrenin sonuna veya başına boşluk kopyalamadığınızdan emin olun.`);
    }

    const response = await res.json();

    return response.results.map((page: any) => {
      const props = page.properties;
      
      // Fallback to user's localized names if english schema fails
      const name = getPropString(props['Name']) || getPropString(props['Ad']) || "İsimsiz";
      const rawPrice = getPropString(props['Price']) || getPropString(props['Fiyat']);
      const formattedPrice = rawPrice ? (rawPrice.includes("₺") ? rawPrice : `₺${rawPrice}`) : "";
      const rawDesc = getPropString(props['Description']) || getPropString(props['Açıklama']);
      
      // Since Notion might not have category, default everything to 'Ürün' if empty
      const cat = getPropString(props['Kategori']) || "Ürün";
      
      const reservedKeys = ["Name", "Ad", "Price", "Fiyat", "Description", "Açıklama", "Image", "Görsel", "Görsel (URL)", "Slug", "Marka", "Status", "Kategori"];
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
        slug: getPropString(props['Slug']) || generateSlug(name) || page.id,
        brand: getPropString(props['Marka']),
        price: formattedPrice,
        desc: rawDesc,
        image: getPropString(props['Image']) || getPropString(props['Görsel (URL)']) || "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1080&auto=format&fit=crop",
        category: cat,
        specs,
      };
    });
  } catch (error: any) {
    throw new Error(error.message || String(error));
  }
}

export async function getAllProducts() {
  const items = await fetchAllItems();
  return items.filter(item => item.category.trim().toLowerCase() === "ürün" || item.category === ""); // if empty, treat as product via standard fetch
}

export async function getAllProjects() {
  const items = await fetchAllItems();
  return items.filter(item => item.category.trim().toLowerCase() === "proje");
}

export async function getItemBySlug(slug: string) {
  const items = await fetchAllItems();
  const match = items.find(item => item.slug === slug);
  return match || null;
}

export async function getUniqueBrands() {
    const products = await getAllProducts();
    const brands = products.map(p => p.brand).filter(b => b);
    return Array.from(new Set(brands));
}

export function slugifyBrand(text: string): string {
  return text.toLowerCase()
    .replace(/[^a-z0-9ğüşıöç]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function getProductsByBrandSlug(brandSlug: string) {
  const products = await getAllProducts();
  return products.filter(p => p.brand && slugifyBrand(p.brand) === brandSlug);
}
