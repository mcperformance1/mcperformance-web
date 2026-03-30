"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Mega Menu datanı buraya da referans olarak alıyoruz ki kategoriler şaşmasın
const QUICK_CATEGORIES = [
  { title: "SÜSPANSİYON", slug: "SÜSPANSİYON & YÜRÜYEN" },
  { title: "FREN", slug: "FREN" },
  { title: "JANT & SPACER", slug: "JANT VE SPACER" },
  { title: "AFTERMARKET", slug: "AFTERMARKET PARTS" },
  { title: "BMW OEM", slug: "BMW OEM PARTS" },
];

export default function ClientHero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero.png')" }}
      />
      <div className="absolute inset-0 z-10 bg-[#000000]/80 mix-blend-multiply" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]/60" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
        className="relative z-20 w-full text-center px-4 flex flex-col items-center justify-center pt-16"
      >
        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black italic uppercase tracking-tighter text-white leading-none drop-shadow-2xl">
          MC PERFORMANCE
        </h1>
        <motion.p 
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4, duration: 0.8 }}
           className="text-gray-400 font-black italic uppercase tracking-[0.2em] text-sm md:text-lg mt-4 mb-8 max-w-2xl px-4 drop-shadow-lg"
        >
           OTOMOTİV YEDEK PARÇA & PERFORMANS PARÇALARI
        </motion.p>
        
        {/* MASAÜSTÜ GÖRÜNÜM: ESKİ LİNK OLDUĞU GİBİ DURUYOR */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8, duration: 0.5 }}
           className="hidden md:block"
        >
          <Link 
            href="/magaza"
            className="text-white border-b border-white/50 pb-1 px-2 font-black italic uppercase tracking-widest text-sm md:text-base hover:text-gray-300 hover:border-white transition-colors"
          >
            TÜM MAĞAZAYI İNCELE
          </Link>
        </motion.div>

        {/* MOBİL GÖRÜNÜM: HIZLI KATEGORİ ERİŞİMİ */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8, duration: 0.5 }}
           className="flex flex-col space-y-3 w-full max-w-[280px] md:hidden"
        >
          <p className="text-[#FF5722] text-[10px] font-black italic tracking-[0.3em] mb-2 uppercase">HIZLI REYON SEÇİMİ</p>
          <div className="grid grid-cols-1 gap-2">
            {QUICK_CATEGORIES.map((cat) => (
              <Link 
                key={cat.title}
                href={`/magaza?tur=${encodeURIComponent(cat.slug)}`}
                className="bg-white/5 border border-white/10 py-3 px-4 rounded-xl text-white font-black italic uppercase tracking-widest text-[11px] active:bg-[#FF5722] active:scale-95 transition-all duration-200"
              >
                {cat.title}
              </Link>
            ))}
            <Link 
              href="/magaza"
              className="text-gray-500 font-black italic uppercase tracking-widest text-[9px] mt-4 hover:text-white transition-colors"
            >
              Veya Tüm Ürünlere Bak →
            </Link>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}