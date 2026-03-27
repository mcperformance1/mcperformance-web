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
  specs: string[];
}

function getPropString(prop: any): string {
  if (!prop) return "";
  if (prop.type === "title") return prop.title?.map((t: any) => t.plain_text).join("") || "";
  if (prop.type === "rich_text") return prop.rich_text?.map((t: any) => t.plain_text).join("") || "";
  if (prop.type === "select") return prop.select?.name || "";
  if (prop.type === "multi_select") return prop.multi_select?.map((s: any) => s.name).join(", ") || "";
  if (prop.type === "number") return prop.number?.toString() || "";
  if (prop.type === "url") return prop.url || "";
  return "";
}

function generateSlug(text: string): string {
  return text.toLowerCase()
    .replace(/[^a-z0-9ğüşıöç]+/g, '-') // Handle Turkish chars
    .replace(/^-+|-+$/g, '');
}

export async function fetchAllItems(): Promise<NotionItem[]> {
  if (!databaseId || !process.env.NOTION_SECRET) return [];
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

    if (!res.ok) {
      console.error("Notion API error:", await res.text());
      return [];
    }

    const response = await res.json();

    return response.results.map((page: any) => {
      const props = page.properties;
      const name = getPropString(props['Ad']) || "İsimsiz";
      
      const rawPrice = getPropString(props['Fiyat']);
      const formattedPrice = rawPrice ? (rawPrice.includes("₺") ? rawPrice : `₺${rawPrice}`) : "";

      const rawDesc = getPropString(props['Açıklama']);
      
      return {
        id: page.id,
        name,
        slug: generateSlug(name) || page.id,
        brand: getPropString(props['Marka']),
        price: formattedPrice,
        desc: rawDesc,
        image: getPropString(props['Görsel (URL)']) || "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1080&auto=format&fit=crop",
        category: getPropString(props['Kategori']),
        specs: [],
      };
    });
  } catch (error) {
    console.error("Notion fetch Error:", error);
    return [];
  }
}

export async function getAllProducts() {
  const items = await fetchAllItems();
  return items.filter(item => item.category === "Ürün");
}

export async function getAllProjects() {
  const items = await fetchAllItems();
  return items.filter(item => item.category === "Proje");
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
