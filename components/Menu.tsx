"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Menu({ isOpen, onClose }: MenuProps) {
  const links = [
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
            className="fixed inset-y-0 right-0 w-full md:w-[320px] bg-[#0A0A0A] z-50 flex flex-col p-8 border-l border-[#1A1A1A]"
          >
            <div className="flex justify-end mb-12">
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                 <X size={32} strokeWidth={2} />
              </button>
            </div>
            
            <nav className="flex flex-col flex-1 space-y-8 mt-10">
              {links.map((item, i) => (
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
                    <span className="text-3xl font-black italic uppercase text-gray-300 group-hover:text-white group-hover:pl-2 transition-all duration-200">
                      {item.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
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
