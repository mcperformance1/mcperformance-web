import React from "react";
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import ProductCard from "../../components/ProductCard";
import { getAllProducts, normalizeType } from "../../lib/notion";

export default async function Magaza({ searchParams }: { searchParams: Promise<{ q?: string; tur?: string }> }) {
  const params = await searchParams;
  const q = params.q;
  const tur = params.tur ? decodeURIComponent(params.tur) : undefined; // URL'deki karakterleri düzeltir
  
  const products = await getAllProducts();
  
  const query = q?.toLowerCase().trim();
  const rawTur = normalizeType(tur); 
  
  let displayedProducts = products;

  // 1. Arama Filtresi
  if (query) {
    displayedProducts = displayedProducts.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.brand?.toLowerCase().includes(query)
    );
  }

  // 2. Tür1 Filtresi - Mega Menü Bağlantısı
  if (rawTur) {
    displayedProducts = displayedProducts.filter(p => {
       const pType = normalizeType(p.type); 
       // Notion'daki Tür1 ile Menüden geleni karşılaştırır
       return pType !== "" && (pType === rawTur || pType.includes(rawTur) || rawTur.includes(pType));
    });
  }

  const pageTitle = tur ? `${tur.toUpperCase()} ÜRÜNLERİ` : "TÜM ÜRÜNLER";

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6 max-w-screen-2xl mx-auto flex flex-col items-center">
       <h1 className="text-4xl md:text-5xl font-black italic uppercase mb-16 text-center drop-shadow-lg tracking-[0.2em]">
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
                 : tur 
                 ? `"${tur}" kategorisinde henüz ürün bulunamadı.`
                 : "Mağazada henüz ürün bulunmuyor."}
             </p>
             <div className="mt-8 p-6 border border-zinc-900 rounded-2xl bg-zinc-950/50">
                <p className="text-orange-500 text-[10px] uppercase font-black tracking-widest mb-3">🛠️ Teknik Check-up:</p>
                <ul className="text-zinc-500 text-[11px] uppercase space-y-2 text-left inline-block">
                  <li>• Notion'da <span className="text-white">Kategori</span> sütunu tam olarak <span className="text-white">"ürün"</span> mü?</li>
                  <li>• Notion'da <span className="text-white">Tür1</span> sütunu <span className="text-white">"{tur}"</span> ile aynı mı?</li>
                  <li>• Sitedeki Footer logosu için resim adı <span className="text-white">logo.png</span> mi?</li>
                </ul>
             </div>
           </div>
         )}
       </div>
    </div>
  )
}