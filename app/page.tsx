import React from "react";
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { getAllProducts, getUniqueBrands } from "../lib/notion";

// Animasyonlar SSR uyumlu Client wrapperlarda kalacağı için ana çerçeveyi düz react node kullanarak oluşturuyoruz.
// Veya 'framer-motion' kullanan kısımları client-side olarak ayırabiliriz.
import ClientHero from "../components/ClientHero";
import BrandsSlider from "../components/BrandsSlider";
import CategoryGrid from "../components/CategoryGrid";

export default async function Home() {
  const products = await getAllProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="w-full flex flex-col bg-[#000000] min-h-screen selection:bg-white selection:text-black">
      
      {/* ClientHero framer-motion kullandığı için ayrı bir Client Component oldu */}
      <ClientHero />

      {/* INFINITE MARQUEE (MARKALAR) - Client Component */}
      <BrandsSlider />

      {/* ANA KATEGORİ VİTRİNİ */}
      <CategoryGrid />

      {/* ÖNE ÇIKAN ÜRÜNLER (VİTRİN) - Server Rendered */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 py-32 w-full relative z-20">
        <h2 className="text-3xl md:text-5xl font-black italic uppercase text-white tracking-tighter mb-16 text-center">
          ÖNE ÇIKAN ÜRÜNLER
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.length === 0 ? (
            <p className="text-gray-500 font-bold italic col-span-full text-center">Notion tablonuzda henüz ürün bulunmuyor.</p>
          ) : (
            featuredProducts.map(product => (
              <ProductCard key={product.id} data={product} />
            ))
          )}
        </div>
      </section>

    </div>
  );
}
