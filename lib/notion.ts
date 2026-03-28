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
  if (prop.type === "files") return prop.files?.[0]?.file?.url || prop.files?.[0]?.external?.url || "";
  return "";
}

function getPropFilesArray(prop: any): string[] {
  if (!prop || prop.type !== "files" || !prop.files) return [];
  return prop.files.map((f: any) => f.file?.url || f.external?.url).filter(Boolean);
}

function generateSlug(text: string): string {
  return text.toLowerCase()
    .replace(/[^a-z0-9ğüşıöç]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function fetchAllItems(): Promise<NotionItem[]> {
  if (!databaseId || !process.env.NOTION_SECRET) {
     throw new Error("Vercel'de NOTION_SECRET veya NOTION_DATABASE_ID eksik!");
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
      cache: "no-store" 
    });

    if (!res.ok) throw new Error("Notion API Hatası");

    const response = await res.json();

    return response.results.map((page: any) => {
      const props = page.properties;
      
      // Notion'daki Name sütununa bakıyoruz
      const name = getPropString(props['Name']) || getPropString(props['Ad']) || "İsimsiz Ürün";
      
      const rawPrice = getPropString(props['Price']) || getPropString(props['Fiyat']);
      const formattedPrice = rawPrice ? (rawPrice.includes("₺") ? rawPrice : `₺${rawPrice}`) : "";
      
      const rawDesc = getPropString(props['Description']) || getPropString(props['Açıklama']);
      const cat = getPropString(props['Kategori']) || "ürün";
      
      // Tür1 veya Tür sütununa bakıyoruz
      const typeStr = getPropString(props['Tür 1']) || getPropString(props['Tür1']) || getPropString(props['Tür']) || "";
      
      // Resim çekme mantığı: Önce Image sütunu, yoksa Galeri
      const imgFromCol = getPropString(props['Image']) || getPropString(props['Görsel (URL)']);
      const galleryFiles = getPropFilesArray(props['Galeri'] || props['Gallery']);
      
      const mainImage = imgFromCol || galleryFiles[0] || "/logo.png";
      
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
        slug: getPropString(props['Slug']) || generateSlug(name) || page.id,
        brand: getPropString(props['Marka']),
        price: formattedPrice,
        desc: rawDesc,
        image: mainImage,
        images: galleryFiles,
        category: cat,
        type: typeStr,
        specs,
      };
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getAllProducts() {
  const items = await fetchAllItems();
  return items.filter(item => item.category.trim().toLowerCase() === "ürün" || item.category === ""); 
}

export async function getAllProjects() {
  const items = await fetchAllItems();
  return items.filter(item => item.category.trim().toLowerCase() === "proje");
}

export async function getItemBySlug(slug: string) {
  const items = await fetchAllItems();
  return items.find(item => item.slug === slug) || null;
}

export function normalizeType(text?: string): string {
  if (!text) return "";
  try { text = decodeURIComponent(text); } catch (e) {}
  return text.toLowerCase().replace(/[^a-z0-9ğüşıöç]/g, '');
}