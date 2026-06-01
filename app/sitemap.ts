import { fetchAllItems } from "../lib/notion";
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.mcperformance.com.tr";

  // Notion'daki tüm verileri çekiyoruz
  const allItems = await fetchAllItems();

  // Ürünler ve Projeleri kategorilerine göre ayırıyoruz
  const products = allItems.filter(item => item.category.toLowerCase().includes("ürün") || item.category === "");
  const projects = allItems.filter(item => item.category.toLowerCase().includes("proje"));

  // Ürün linklerini sitemap formatına sokuyoruz
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Proje linklerini sitemap formatına sokuyoruz
  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projeler/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Sabit sayfalar (Ana sayfa, Mağaza, Projeler, 3D Baskı Hizmeti)
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/magaza`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projeler`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/3d-baski-hizmeti`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  return [
    ...staticPages,
    ...productUrls,
    ...projectUrls,
  ];
}