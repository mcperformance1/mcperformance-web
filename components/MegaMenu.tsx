"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export const MEGA_MENU_DATA = [
  { title: "SÜSPANSİYON", items: ["Coilover Kiti", "Coilspring Kiti", "Spor Yay Kiti"] },
  { title: "FREN", items: ["Fren Kitleri", "Fren Balataları", "Fren Hortumları"] },
  { title: "JANT VE SPACER", items: ["Protrack One", "ST Spacer & Bijon", "Protrack Saplama", "Braid Wheels"] },
  { title: "KULE GERGİLERİ", items: ["Racing Line Aluminyum", "Çelik Serisi"] },
  { title: "ELEKTRONİK", items: ["AEM Performance", "Sprint Booster"] },
  { title: "AFTERMARKET PARTS", items: ["S55 Crankhub Kiti"] },
  { title: "BMW OEM PARTS", items: ["B58 OEM Parts", "S55 OEM Parts"] }
];

export default function MegaMenu() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Kapanma süresini buradan tek tıkla ayarlayabilirsin (2000 = 2 saniye)
  const CLOSE_DELAY = 2000;

  const handleMouseEnter = (catTitle: string) => {
    // Önceki kapanma sayacını anında öldür
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoveredCategory(catTitle);
  };

  const handleMouseLeave = () => {
    // Mouse çıkınca sayacı başlat
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, CLOSE_DELAY);
  };

  const handlePanelMouseEnter = () => {
    // Panele girince kapanmayı iptal et, menü açık kalsın
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handlePanelMouseLeave = () => {
    // Panelden de çıkınca sayacı başlat
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, CLOSE_DELAY);
  };

  const titleClass = "uppercase font-bold italic tracking-[0.15em] text-[10px] xl:text-[11px] hover:text-[#FF5722] transition-colors duration-300 py-6 cursor-pointer";

  return (
    <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 relative group">
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
               className="absolute bottom-4 left-0 w-full h-[2px] bg-[#FF5722]"
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
            onMouseEnter={handlePanelMouseEnter}
            onMouseLeave={handlePanelMouseLeave}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 w-screen bg-zinc-950/95 backdrop-blur-xl border-b border-t border-[#222222] shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-50 overflow-hidden"
          >
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                {MEGA_MENU_DATA.map((cat) => (
                  <div key={cat.title} className={`flex flex-col space-y-4 ${hoveredCategory === cat.title ? 'opacity-100' : 'opacity-40 hover:opacity-100 transition-opacity duration-300'}`}>
                     <Link 
                       href={`/magaza?tur=${encodeURIComponent(cat.title)}`}
                       className="text-[#FF5722] font-black italic uppercase tracking-[0.1em] text-xs md:text-sm border-b border-[#333] pb-2"
                     >
                        {cat.title}
                     </Link>
                     <ul className="flex flex-col space-y-3">
                       {cat.items.map(subItem => (
                         <li key={subItem}>
                           <Link 
                              href={`/magaza?tur=${encodeURIComponent(subItem)}`} 
                              className="text-gray-300 hover:text-white hover:translate-x-1 font-bold italic text-[11px] md:text-xs tracking-wider transition-all duration-300 block"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}