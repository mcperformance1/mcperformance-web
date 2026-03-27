import React from "react";
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import ProductCard from "../../components/ProductCard";
import { getAllProducts } from "../../lib/notion";

export default async function Magaza({ searchParams }: { searchParams: { q?: string } }) {
  const products = await getAllProducts();
  const q = searchParams.q?.toLowerCase();
  
  const displayedProducts = q 
    ? products.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
    : products;

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6 max-w-screen-2xl mx-auto flex flex-col items-center">
       <h1 className="text-4xl md:text-6xl font-black italic uppercase mb-16 text-center drop-shadow-lg tracking-tighter">
         TÜM ÜRÜNLER
       </h1>
       
       <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-24">
         {displayedProducts.length > 0 ? (
           displayedProducts.map(product => (
             <ProductCard key={product.id} data={product} />
           ))
         ) : (
           <div className="col-span-full py-20 text-center">
             <p className="text-gray-500 font-bold italic text-xl">
               {q ? `"${q}" için sonuç bulunamadı.` : "Mağazada henüz ürün bulunmuyor."}
             </p>
           </div>
         )}
       </div>
    </div>
  )
}
