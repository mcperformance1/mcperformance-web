"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ChevronRight } from "lucide-react";

const QUICK_CATEGORIES = [
  { title: "SÜSPANSİYON", slug: "SÜSPANSİYON & YÜRÜYEN" },
  { title: "FREN", slug: "FREN" },
  { title: "JANT & SPACER", slug: "JANT VE SPACER" },
  { title: "AFTERMARKET", slug: "AFTERMARKET PARTS" },
  { title: "BMW OEM", slug: "BMW OEM PARTS" },
];

export default function ClientHero() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

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
        
        {/* DESKTOP GÖRÜNÜM */}
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

        {/* MOBİL GÖRÜNÜM: TEK BUTON KATEGORİ SİSTEMİ */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8, duration: 0.5 }}
           className="flex flex-col items-center w-full md:hidden"
        >
          <button 
            onClick={() => setIsCategoryOpen(true)}
            className="text-[#FF5722] border-2 border-[#FF5722]/50 bg-[#FF5722]/10 py-4 px-10 rounded-full font-black italic uppercase tracking-[0.25em] text-[12px] active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(255,87,34,0.3)] animate-pulse"
          >
            KATEGORİ SEÇİMİ 🏎️
          </button>
          
          <Link 
            href="/magaza"
            className="text-white/30 font-black italic uppercase tracking-widest text-[9px] mt-8"
          >
            Veya Direkt Mağazaya Git →
          </Link>
        </motion.div>
      </motion.div>

      {/* MOBİL KATEGORİ PANELİ (POP-UP) */}
      <AnimatePresence>
        {isCategoryOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col p-10 md:hidden"
          >
            {/* KAPATMA BUTONU */}
            <div className="flex justify-end mb-16">
              <button 
                onClick={() => setIsCategoryOpen(false)}
                className="text-white/50 hover:text-[#FF5722] p-2"
              >
                <X size={36} strokeWidth={3} />
              </button>
            </div>

            <div className="flex flex-col space-y-4 overflow-y-auto">
              <p className="text-[#FF5722] font-black italic tracking-[0.4em] text-[11px] uppercase mb-6 text-center">
                REYONUNU SEÇ KANKA
              </p>
              
              {QUICK_CATEGORIES.map((cat, index) => (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    href={`/magaza?tur=${encodeURIComponent(cat.slug)}`}
                    onClick={() => setIsCategoryOpen(false)}
                    className="group flex items-center justify-between bg-zinc-900/50 border border-white/10 p-6 rounded-3xl active:bg-[#FF5722]/20 active:border-[#FF5722]/50 transition-all duration-300"
                  >
                    <span className="text-white font-black italic uppercase tracking-widest text-[13px]">
                      {cat.title}
                    </span>
                    <ChevronRight className="text-[#FF5722]" size={24} />
                  </Link>
                </motion.div>
              ))}

              <button 
                onClick={() => setIsCategoryOpen(false)}
                className="mt-10 text-white/20 font-black italic uppercase tracking-[0.2em] text-[10px]"
              >
                 Vazgeçtim, geri dön
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}