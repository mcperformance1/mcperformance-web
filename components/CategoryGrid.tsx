import React from "react";
import Link from "next/link";
import { getAllProducts } from "../lib/notion";

export default async function CategoryGrid() {
  const products = await getAllProducts();

  const categories = [
    { title: "JANT & SPACER", queryParam: "JANT & SPACER" },
    { title: "BMW OEM PARTS", queryParam: "BMW OEM PARTS" },
    { title: "COILOVER", queryParam: "COILOVER" },
    { title: "FREN KİTİ", queryParam: "FREN KİTİ" }
  ];

  return (
    <section className="w-full bg-[#000000] border-b border-[#222222]">
      <div className="w-full max-w-screen-2xl mx-auto px-4 lg:px-8 py-8 lg:py-12 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {categories.map((cat, idx) => {
            // İlgili kategoriye ait ilk ürünü bularak Notion'dan dinamik görsel çekiyoruz
            const match = products.find(
              (p) => p.category.trim().toLowerCase() === cat.title.toLowerCase() && p.image
            );
            const bgImage = match?.image || null;

            return (
              <Link 
                key={idx} 
                href={`/magaza?kategori=${encodeURIComponent(cat.queryParam)}`}
                className="group relative block w-full aspect-[4/3] lg:aspect-[16/9] overflow-hidden rounded-md shadow-lg"
              >
                {/* Arka Plan (Görsel varsa Görsel, yoksa Şık Koyu Gradient) */}
                {bgImage ? (
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${bgImage})` }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#111111] to-[#2a2a2a] transition-transform duration-700 ease-in-out group-hover:scale-105" />
                )}
                
                {/* Okunabilirlik İçin Siyah Film (Overlay) */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                
                {/* Metin İçeriği (Yazılar alt-sol veya ortada hizalanabilir, şeritte orta hizalama çok şık durur) */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <h3 className="text-xl sm:text-2xl lg:text-[1.35rem] xl:text-2xl font-black italic uppercase text-white tracking-wider text-center drop-shadow-lg transition-colors duration-300 group-hover:text-[#FF5722] leading-tight flex-wrap w-full">
                    {cat.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
