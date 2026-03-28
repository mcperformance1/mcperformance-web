import React from "react";
import Link from "next/link";
import { getAllProducts } from "../lib/notion";

export default async function CategoryGrid() {
  const products = await getAllProducts();

  const categories = [
    { title: "JANT & SPACER", queryParam: "JANT & SPACER" },
    { title: "BMW OEM PARTS", queryParam: "BMW OEM PARTS" },
    { title: "COILOVER", queryParam: "COILOVER" },
    { title: "KULE GERGİLERİ", queryParam: "KULE GERGİLERİ" } 
  ];

  return (
    <section className="w-full bg-[#000000] border-b border-[#222222]">
      <div className="w-full max-w-screen-2xl mx-auto px-4 lg:px-8 py-8 lg:py-12 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {categories.map((cat, idx) => {
            return (
              <Link 
                key={idx} 
                href={`/magaza?tur=${encodeURIComponent(cat.queryParam)}`}
                className="group relative flex items-center justify-center w-full aspect-[4/3] lg:aspect-[16/9] overflow-hidden rounded-md border border-white/10 bg-transparent backdrop-blur-md transition-colors duration-500 hover:bg-white/10"
              >
                <h3 className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-black italic uppercase text-white tracking-wider text-center drop-shadow-md transition-colors duration-300">
                  {cat.title}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
