import React from "react";
import ProductCard from "../../../components/ProductCard";
import { getAllProducts } from "../../../lib/notion";

export default async function MarkaPage({ params }: { params: { brand: string } }) {
  const brandNameDecode = decodeURIComponent(params.brand);
  const products = await getAllProducts();
  const filteredProducts = products.filter(p => p.brand.toLowerCase() === brandNameDecode.toLowerCase());

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6 max-w-screen-2xl mx-auto flex flex-col items-center">
       <h1 className="text-4xl md:text-6xl font-black italic uppercase mb-12 text-center drop-shadow-lg tracking-tight">
         {brandNameDecode === 'undefined' ? "MARKA" : brandNameDecode} PARÇALARI
       </h1>
       
       {filteredProducts.length > 0 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
       ) : (
          <div className="py-24 text-center border border-[#111111] bg-[#050505] w-full max-w-3xl">
            <h3 className="text-2xl font-black italic text-gray-500 uppercase p-10">
              Bu markaya ait ürün şu an stokta bulunmuyor veya Notion tablosunda eksik.
            </h3>
          </div>
       )}
    </div>
  )
}
