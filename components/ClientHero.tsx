"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { X, ChevronDown, ChevronRight } from "lucide-react";

// MEGA MENÜ DATASI
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
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("showMenu") === "true") {
      setIsCategoryOpen(true);
    }
  }, [searchParams]);

  const toggleAccordion = (title: string) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* ARKA PLAN */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero.png')" }}
      />
      <div className="absolute inset-0 z-10 bg-[#000000]/80 mix-blend-multiply" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]/60" />
      
      {/* ANA İÇERİK */}
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
        
        {/* BUTON GRUBU */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8, duration: 0.5 }}
           className="flex flex-col items-center justify-center gap-4 w-full"
        >
          {/* KATEGORİ SEÇİMİ (SADECE MOBİLDE GÖZÜKÜR: md:hidden) */}
          <button 
            onClick={() => setIsCategoryOpen(true)}
            className="md:hidden w-[280px] text-[#FF5722] border-2 border-[#FF5722]/50 bg-[#FF5722]/10 py-4 px-10 rounded-full font-black italic uppercase tracking-[0.25em] text-[12px] active:scale-95 transition-all shadow-[0_0_30px_rgba(255,87,34,0.3)]"
          >
            KATEGORİ SEÇİMİ
          </button>

          {/* TÜM PROJELERİMİZ (HEM WEB HEM MOBİLDE GÖZÜKÜR) */}
          <Link 
            href="/projeler"
            className="w-[280px] md:w-auto text-white border-2 border-white/20 bg-white/5 py-4 px-12 rounded-full font-black italic uppercase tracking-[0.25em] text-[12px] active:scale-95 transition-all hover:bg-white hover:text-black hover:border-white shadow-xl"
          >
            TÜM PROJELERİMİZ
          </Link>

          {/* Web'de altta ince bir "Mağazaya Git" linki istersen diye (opsiyonel) */}
          <Link 
            href="/magaza"
            className="hidden md:block text-white/30 hover:text-white font-black italic uppercase tracking-widest text-[10px] mt-4 transition-colors"
          >
            Veya Direkt Mağazaya Göz At →
          </Link>
        </motion.div>
      </motion.div>

      {/* MOBİL KATEGORİ PANELİ (DEĞİŞMEDİ) */}
      <AnimatePresence>
        {isCategoryOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl md:hidden flex flex-col"
          >
            <div className="flex justify-end p-8 flex-shrink-0">
              <button onClick={() => setIsCategoryOpen(false)} className="text-white/40 hover:text-[#FF5722] p-2 transition-all">
                <X size={36} strokeWidth={3} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-24 scrollbar-hide">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <p className="text-[#FF5722] font-black italic tracking-[0.4em] text-[10px] uppercase mb-10 text-center opacity-80">
                  PERFORMANS REYONLARI
                </p>
              </motion.div>
              
              <div className="flex flex-col space-y-4">
                {MEGA_MENU_DATA.map((cat, index) => {
                  const isOpen = openAccordion === cat.title;
                  return (
                    <motion.div 
                      key={cat.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.3 }}
                      className="flex flex-col w-full bg-zinc-900/30 border border-white/5 rounded-3xl overflow-hidden shrink-0"
                    >
                      <button 
                        onClick={() => toggleAccordion(cat.title)}
                        className={`flex items-center justify-between w-full p-6 text-left transition-all duration-300 ${isOpen ? 'bg-[#FF5722]/10' : 'active:bg-white/5'}`}
                      >
                        <span className={`font-black italic uppercase tracking-widest text-[13px] ${isOpen ? 'text-[#FF5722]' : 'text-white'}`}>
                          {cat.title}
                        </span>
                        <ChevronDown className={`text-[#FF5722] transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} size={20} />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className="bg-black/40 border-t border-white/5"
                          >
                            <div className="flex flex-col p-3">
                              {cat.items.map((subItem) => (
                                <Link 
                                  key={subItem}
                                  href={`/magaza?tur=${encodeURIComponent(subItem)}`}
                                  onClick={() => setIsCategoryOpen(false)}
                                  className="flex items-center justify-between py-4 px-6 rounded-2xl group active:bg-[#FF5722]/20 transition-all"
                                >
                                  <span className="text-gray-400 group-active:text-white font-black italic uppercase text-[11px] tracking-wider transition-colors">
                                    {subItem}
                                  </span>
                                  <ChevronRight size={14} className="text-[#FF5722] opacity-50 group-active:opacity-100" />
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              <div className="py-12 flex justify-center">
                <button onClick={() => setIsCategoryOpen(false)} className="text-white/20 hover:text-white font-black italic uppercase tracking-[0.3em] text-[10px] transition-all">
                   MENÜYÜ KAPAT
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}