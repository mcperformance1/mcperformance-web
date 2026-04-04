"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export const MEGA_MENU_DATA = [
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
    title: "ENGINE UPGRADE PARTS", 
    items: [
      "Turbocharger Kits & Upgrades",
      "Intercoolers & Chargepipes",
      "Performance Intake Systems",
      "Engine Hardware & Studs",
      "Fuel Injectors & Pumps"
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

export default function MegaMenu() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const CLOSE_DELAY = 300;

  const handleMouseEnter = (catTitle: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoveredCategory(catTitle);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, CLOSE_DELAY);
  };

  // --- SLIM-FIT AYARI: text-[9px] yaptık ve tracking'i daralttık ---
  const titleClass = "uppercase font-black italic tracking-[0.1em] text-[9px] xl:text-[10px] text-white/70 hover:text-[#FF5722] transition-all duration-300 py-6 cursor-pointer block whitespace-nowrap";

  return (
    // space-x-4 ve xl:space-x-6 ile Header'da yer açtık
    <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 relative group h-full">
      {MEGA_MENU_DATA.map((cat) => (
        <div 
          key={cat.title} 
          className="relative"
          onMouseEnter={() => handleMouseEnter(cat.title)}
          onMouseLeave={handleMouseLeave}
        >
          <Link href={`/magaza?tur=${encodeURIComponent(cat.title)}`} className={titleClass}>
            {cat.title}
          </Link>
          
          {hoveredCategory === cat.title && (
             <motion.div 
               layoutId="megamenu-underline"
               className="absolute bottom-5 left-0 w-full h-[2px] bg-[#FF5722]"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
             />
          )}
        </div>
      ))}

      <AnimatePresence>
        {hoveredCategory && (
          <motion.div
            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2, ease: "circOut" }}
            className="absolute top-[85%] left-1/2 -translate-x-1/2 w-[95vw] max-w-screen-2xl bg-zinc-950/98 backdrop-blur-2xl border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.9)] z-50 rounded-3xl overflow-hidden"
          >
            <div className="p-10 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-6">
                {MEGA_MENU_DATA.map((cat) => (
                  <div key={cat.title} className={`flex flex-col space-y-5 transition-all duration-500 ${hoveredCategory === cat.title ? 'opacity-100 scale-105' : 'opacity-30'}`}>
                     <Link 
                       href={`/magaza?tur=${encodeURIComponent(cat.title)}`}
                       className="text-[#FF5722] font-black italic uppercase tracking-[0.2em] text-[10px] border-b-2 border-[#FF5722]/20 pb-2"
                     >
                        {cat.title}
                     </Link>
                     <ul className="flex flex-col space-y-3">
                       {cat.items.map(subItem => (
                         <li key={subItem}>
                           <Link 
                             href={`/magaza?tur=${encodeURIComponent(subItem)}`} 
                             className="text-gray-400 hover:text-white hover:translate-x-2 font-black italic uppercase text-[9px] tracking-[0.1em] transition-all duration-300 block"
                           >
                             {subItem}
                           </Link>
                         </li>
                       ))}
                     </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#FF5722] to-transparent opacity-30" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}