import React from "react";
import Link from "next/link";
import { getAllProducts } from "../lib/notion";

export default async function CategoryGrid() {
  const products = await getAllProducts();

  const categories = [
    { title: "JANT & SPACER", queryParam: "JANT & SPACER", fallback: "https://images.unsplash.com/photo-1596756611364-c2c61aa01a91?q=80&w=1200&auto=format&fit=crop" },
    { title: "BMW OEM PARTS", queryParam: "BMW OEM PARTS", fallback: "https://images.unsplash.com/photo-1555005881-81d3f6d7abaf?q=80&w=1200&auto=format&fit=crop" },
    { title: "COILOVER", queryParam: "COILOVER", fallback: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1200&auto=format&fit=crop" },
    { title: "KULE GERGİLERİ", queryParam: "KULE GERGİLERİ", fallback: "https://images.unsplash.com/photo-1627885011702-861d8032c521?q=80&w=1200&auto=format&fit=crop" } // using a suspension/mechanic type background for strut bar
  ];

  return (
    <section className="w-full bg-[#000000] border-b border-[#222222]">
      <div className="w-full max-w-screen-2xl mx-auto px-4 lg:px-8 py-8 lg:py-12 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {categories.map((cat, idx) => {
            // İlgili tür'e (type) ait ilk ürünü bularak Notion'dan dinamik görsel çekiyoruz
            const match = products.find(
              (p) => p.type?.trim().toLowerCase() === cat.title.toLowerCase() && p.image
            );
            const bgImage = match?.image || cat.fallback;

            return (
              <Link 
                key={idx} 
                href={`/magaza?tur=${encodeURIComponent(cat.queryParam)}`}
                className="group relative block w-full aspect-[4/3] lg:aspect-[16/9] overflow-hidden rounded-md shadow-lg"
              >
                {/* Arka Plan Görseli */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${bgImage})` }}
                />
                
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
