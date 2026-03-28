import React from "react";
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import ProductCard from "../../components/ProductCard";
import { getAllProducts } from "../../lib/notion";

export default async function Magaza({ searchParams }: { searchParams: Promise<{ q?: string; tur?: string }> }) {
  const { q, tur } = await searchParams;
  const products = await getAllProducts();
  
  const query = q?.toLowerCase();
  const rawTur = tur?.toLowerCase();
  
  let displayedProducts = products;

  if (query) {
    displayedProducts = displayedProducts.filter(p => 
      p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query)
    );
  }

  if (rawTur) {
    // Sadece "Tür" (Type) eşleşen ürünleri göster
    displayedProducts = displayedProducts.filter(p => p.type?.toLowerCase() === rawTur);
  }

  const pageTitle = tur ? `${tur} ÜRÜNLERİ` : "TÜM ÜRÜNLER";

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6 max-w-screen-2xl mx-auto flex flex-col items-center">
       <h1 className="text-4xl md:text-5xl font-black italic uppercase mb-16 text-center drop-shadow-lg tracking-tighter">
         {pageTitle}
       </h1>
       
       <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-24">
         {displayedProducts.length > 0 ? (
           displayedProducts.map(product => (
             <ProductCard key={product.id} data={product} />
           ))
         ) : (
           <div className="col-span-full py-20 text-center">
             <p className="text-gray-500 font-bold italic text-xl">
               {query 
                 ? `"${query}" aramanız için sonuç bulunamadı.` 
                 : rawTur 
                 ? `"${rawTur}" türüne ait ürün bulunamadı.`
                 : "Mağazada henüz ürün bulunmuyor."}
             </p>
           </div>
         )}
       </div>
    </div>
  )
}
