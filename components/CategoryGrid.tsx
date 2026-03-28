"use client";
import React from "react";
import Link from "next/link";

interface Category {
  title: string;
  image: string;
  queryParam: string;
}

const categories: Category[] = [
  {
    title: "JANT & SPACER",
    queryParam: "JANT & SPACER",
    image: "https://images.unsplash.com/photo-1596756611364-c2c61aa01a91?q=80&w=1200&auto=format&fit=crop" // Sport Rim
  },
  {
    title: "BMW OEM PARTS",
    queryParam: "BMW OEM PARTS",
    image: "https://images.unsplash.com/photo-1555005881-81d3f6d7abaf?q=80&w=1200&auto=format&fit=crop" // BMW Engine/Grille
  },
  {
    title: "COILOVER",
    queryParam: "COILOVER",
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1200&auto=format&fit=crop" // Suspension/Wheel arch
  },
  {
    title: "FREN KİTİ",
    queryParam: "FREN KİTİ",
    image: "https://images.unsplash.com/photo-1486262715619-6708bce77fbb?q=80&w=1200&auto=format&fit=crop" // Wheel with big brake kit
  }
];

export default function CategoryGrid() {
  return (
    <section className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 py-16 lg:py-24 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {categories.map((cat, idx) => (
          <Link 
            key={idx} 
            href={`/magaza?kategori=${encodeURIComponent(cat.queryParam)}`}
            className="group relative block w-full aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl"
          >
            {/* Arka Plan Görseli */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
              style={{ backgroundImage: `url(${cat.image})` }}
            />
            
            {/* Gradient Overlay (Okunabilirlik İçin) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500" />
            
            {/* Metin İçeriği */}
            <div className="absolute inset-0 flex items-end p-8 md:p-10">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black italic uppercase text-white tracking-widest leading-none drop-shadow-md transition-colors duration-300 group-hover:text-[#FF5722]">
                {cat.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
