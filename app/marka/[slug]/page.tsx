import React from "react";
import ProductCard from "../../../components/ProductCard";
import { getProductsByBrandSlug } from "../../../lib/notion";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BrandDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const products = await getProductsByBrandSlug(slug);

  // Marka adını slug üzerinden tekrar biçimlendirmek için basit bir yöntem (veya veritabanındaki markadan alalım)
  const brandName = products.length > 0 && products[0].brand ? products[0].brand : slug.replace(/-/g, " ");

  return (
    <div className="min-h-screen bg-[#000000] text-white pt-40 px-6 max-w-screen-2xl mx-auto flex flex-col pb-32">
      
      <div className="mb-12 border-b border-[#222222] pb-6">
        <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">
          {brandName} ÜRÜNLERİ
        </h1>
        <p className="text-gray-500 font-medium mt-2">
          {products.length} adet sonuç bulundu.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
           <h2 className="text-2xl md:text-3xl font-black italic text-gray-500 uppercase tracking-wide">
             BU MARKAYA AİT ÜRÜN BULUNAMADI.
           </h2>
           <p className="mt-4 text-gray-400">Şu an için Notion veritabanında bu markaya tanımlı içerik yok.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      )}

    </div>
  );
}
