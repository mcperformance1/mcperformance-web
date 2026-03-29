import { fetchAllItems } from "../lib/notion";
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.mcperformance.com.tr";

  // Notion'daki tüm ürünleri çekiyoruz
  const products = await fetchAllItems();

  // Ürün linklerini sitemap formatına sokuyoruz
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Sabit sayfalar (Ana sayfa, Mağaza vb.)
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/magaza`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...productUrls, // Tüm Notion ürünlerini buraya ekledik
  ];
}