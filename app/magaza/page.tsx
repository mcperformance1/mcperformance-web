import React from "react";
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import ProductCard from "../../components/ProductCard";
import { getAllProducts, normalizeType } from "../../lib/notion";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function Magaza({ searchParams }: { searchParams: Promise<{ q?: string; tur?: string }> }) {
  const params = await searchParams;
  const q = params.q;
  const tur = params.tur ? decodeURIComponent(params.tur) : undefined;
  
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

  // 2. Tür1 Filtresi
  if (rawTur) {
    displayedProducts = displayedProducts.filter(p => {
       const pType = normalizeType(p.type); 
       return pType !== "" && (pType === rawTur || pType.includes(rawTur) || rawTur.includes(pType));
    });
  }

  const pageTitle = tur ? `${tur.toUpperCase()}` : "TÜM ÜRÜNLER";

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6 max-w-screen-2xl mx-auto flex flex-col items-center">
        
        {/* DİNAMİK MENÜ NAVİGASYONU - ARTIK DİREKT MEGA MENÜYE ATAR */}
        <div className="w-full flex items-center justify-start mb-8 overflow-hidden">
          <Link 
            href="/?showMenu=true" 
            className="group flex items-center gap-3 text-zinc-500 hover:text-[#FF5722] transition-all duration-300"
          >
            <div className="p-2 rounded-full border border-zinc-900 group-hover:border-[#FF5722]/50 bg-zinc-950/50 transition-all">
              <ChevronLeft size={16} strokeWidth={3} />
            </div>
            <div className="flex flex-col">
              <span className="font-black italic uppercase text-[9px] tracking-[0.2em] opacity-50 leading-none mb-1">MENÜYE DÖN</span>
              <span className="font-black italic uppercase text-[11px] tracking-widest text-zinc-300 group-hover:text-white transition-colors">
                KATEGORİ SEÇİMİ
              </span>
            </div>
          </Link>
        </div>

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
                Sonuç bulunamadı.
              </p>
              <Link 
                href="/?showMenu=true" 
                className="mt-6 inline-block text-[#FF5722] font-black italic uppercase text-[11px] tracking-widest border-b border-[#FF5722] hover:text-white transition-colors"
              >
                KATEGORİLERE GERİ DÖN →
              </Link>
            </div>
          )}
        </div>
    </div>
  );
}