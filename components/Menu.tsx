"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import { MEGA_MENU_DATA } from "./MegaMenu";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Menu({ isOpen, onClose }: MenuProps) {
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  
  const toggleAccordion = (title: string) => {
    setOpenAccordions(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const standaloneLinks = [
    { name: "ANA SAYFA", path: "/" },
    { name: "MAĞAZA", path: "/magaza" },
    { name: "PROJELER", path: "/projeler" },
    { name: "İLETİŞİM", path: "/iletisim" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          {/* Backdrop */}
          <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             exit={{ opacity: 0 }} 
             onClick={onClose}
             className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
          />
          {/* Minimalist Menü */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-[#0A0A0A] z-50 flex flex-col p-8 border-l border-[#1A1A1A] overflow-y-auto overflow-x-hidden"
          >
            <div className="flex justify-end mb-8 sticky top-0 bg-[#0A0A0A] py-2 z-10">
              <button onClick={onClose} className="text-[#FF5722] hover:text-white transition-colors">
                 <X size={32} strokeWidth={2.5} />
              </button>
            </div>
            
            <nav className="flex flex-col flex-1 mt-4">
              {/* Marka Motors Ana Linkler */}
              <div className="flex flex-col space-y-6 border-b border-[#222] pb-8 mb-8">
                {standaloneLinks.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, ease: "easeOut" }}
                  >
                    <Link 
                      href={item.path}
                      onClick={onClose}
                      className="group flex items-center"
                    >
                      <span className="text-2xl font-black italic uppercase tracking-widest text-gray-300 hover:text-white hover:text-[#FF5722] transition-colors duration-300">
                        {item.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Dev Kategoriler (Accordion) */}
              <div className="flex flex-col space-y-4">
                <h4 className="text-[#FF5722] font-black italic tracking-widest text-xs mb-4 opacity-70">
                  KATEGORİLER
                </h4>
                {MEGA_MENU_DATA.map((cat, i) => {
                  const isOpenState = openAccordions.includes(cat.title);
                  return (
                    <motion.div
                      key={cat.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05, ease: "easeOut" }}
                      className="border-b border-[#1A1A1A] pb-2 last:border-0"
                    >
                      <button 
                        onClick={() => toggleAccordion(cat.title)}
                        className="w-full flex justify-between items-center py-2 text-white group"
                      >
                         <span className="text-lg font-black italic uppercase tracking-[0.1em] group-hover:text-[#FF5722] transition-colors">
                            {cat.title}
                         </span>
                         <ChevronDown 
                           size={20} 
                           className={`transition-transform duration-300 ${isOpenState ? 'rotate-180 text-[#FF5722]' : 'text-gray-500'}`} 
                         />
                      </button>

                      <AnimatePresence>
                        {isOpenState && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col space-y-3 py-4 pl-4 border-l-2 border-[#1A1A1A] ml-2">
                               <Link 
                                  href={`/magaza?tur=${encodeURIComponent(cat.title)}`}
                                  onClick={onClose}
                                  className="text-[#FF5722] font-bold italic text-sm tracking-wider mb-2"
                               >
                                  TÜM {cat.title} ÜRÜNLERİ →
                               </Link>
                               {cat.items.map(subItem => (
                                 <Link 
                                    key={subItem}
                                    href={`/magaza?tur=${encodeURIComponent(subItem)}`} 
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-white font-bold italic tracking-wider text-xs md:text-sm py-1"
                                 >
                                    {subItem}
                                 </Link>
                               ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </nav>
            
            <div className="text-gray-600 font-bold italic uppercase tracking-wider mt-auto text-xs">
              © 2026 MC Performance
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
