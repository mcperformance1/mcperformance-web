"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ChevronDown, ChevronRight } from "lucide-react";

// WEB'DEKİ MEGA MENÜ DATASININ BİREBİR AYNISI
const MEGA_MENU_DATA = [
  { 
    title: "SÜSPANSİYON & YÜRÜYEN", 
    items: ["Coilover Kiti", "Coilspring Kiti", "Spor Yay Kiti", "SALINCAK & ROT KOLLARI"] 
  },
  { 
    title: "FREN", 
    items: ["Fren Kitleri", "Fren Balataları", "Fren Hortumları"] 
  },
  { 
    title: "JANT VE SPACER", 
    items: ["Protrack One", "ST Spacer & Bijon", "Protrack Saplama", "Braid Wheels"] 
  },
  { 
    title: "KULE GERGİLERİ", 
    items: ["Racing Line Aluminyum", "Çelik Serisi"] 
  },
  { 
    title: "ELEKTRONİK", 
    items: ["MHD TUNING", "AEM Performance", "Sprint Booster"] 
  },
  { 
    title: "AFTERMARKET PARTS", 
    items: [
      "S55 UPGRADE PARTS", 
      "B58 UPGRADE PARTS", 
      "HAVA FİLTRESİ KİTLERİ", 
      "FORGED ENGINE INTERNALS", 
      "TIAL SPORT", 
      "SİLİKON HORTUM SETLERİ",
      "MOTUL PERFORMANCE OILS"
    ] 
  },
  { 
    title: "BMW OEM PARTS", 
    items: [
      "B58 OEM Parts", 
      "S55 OEM Parts", 
      "VİTES TOPUZLARI", 
      "CARBON LIPS & ACCESSORIES"
    ] 
  }
];

export default function ClientHero() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (title: string) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

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
        
        {/* DESKTOP GÖRÜNÜM: DEĞİŞMEDİ */}
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
            className="text-[#FF5722] border-2 border-[#FF5722]/50 bg-[#FF5722]/10 py-4 px-10 rounded-full font-black italic uppercase tracking-[0.25em] text-[12px] active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(255,87,34,0.3)]"
          >
            KATEGORİ SEÇİMİ
          </button>
          
          <Link 
            href="/magaza"
            className="text-white/30 font-black italic uppercase tracking-widest text-[9px] mt-8"
          >
            Veya Direkt Mağazaya Git →
          </Link>
        </motion.div>
      </motion.div>

      {/* MOBİL KATEGORİ PANELİ (AKORDEONLU) */}
      <AnimatePresence>
        {isCategoryOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex flex-col p-8 md:hidden"
          >
            {/* KAPATMA BUTONU */}
            <div className="flex justify-end mb-8">
              <button 
                onClick={() => setIsCategoryOpen(false)}
                className="text-white/50 hover:text-[#FF5722] p-2"
              >
                <X size={36} strokeWidth={3} />
              </button>
            </div>

            {/* AKORDEON LİSTESİ */}
            <div className="flex flex-col space-y-3 overflow-y-auto pr-2 pb-20">
              <p className="text-[#FF5722] font-black italic tracking-[0.4em] text-[11px] uppercase mb-6 text-center">
                PERFORMANS REYONLARI
              </p>
              
              {MEGA_MENU_DATA.map((cat, index) => {
                const isOpen = openAccordion === cat.title;
                return (
                  <motion.div
                    key={cat.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden"
                  >
                    {/* ANA BAŞLIK */}
                    <button 
                      onClick={() => toggleAccordion(cat.title)}
                      className="group flex items-center justify-between w-full p-5 active:bg-[#FF5722]/10 transition-all"
                    >
                      <span className="text-white font-black italic uppercase tracking-widest text-[12px] text-left">
                        {cat.title}
                      </span>
                      <ChevronDown 
                        className={`text-[#FF5722] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
                        size={20} 
                      />
                    </button>

                    {/* ALT KATEGORİLER */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-white/5 bg-black/40"
                        >
                          <ul className="flex flex-col space-y-1 p-4">
                            {cat.items.map((subItem) => (
                              <li key={subItem}>
                                <Link 
                                  href={`/magaza?tur=${encodeURIComponent(subItem)}`}
                                  onClick={() => setIsCategoryOpen(false)}
                                  className="group flex items-center justify-between py-3 px-4 rounded-xl text-gray-400 active:text-white active:bg-white/5 transition-all"
                                >
                                  <span className="font-black italic uppercase text-[10px] tracking-[0.1em]">
                                    {subItem}
                                  </span>
                                  <ChevronRight className="text-[#FF5722]" size={14} />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}

              <button 
                onClick={() => setIsCategoryOpen(false)}
                className="mt-12 text-white/20 font-black italic uppercase tracking-[0.2em] text-[10px] pb-10"
              >
                 Menüyü Kapat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}