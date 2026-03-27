"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
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
          {/* Cart Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-[#000000] z-50 flex flex-col border-l border-[#222222]"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-[#222222]">
              <div className="flex items-center space-x-3">
                <ShoppingBag size={24} className="text-white" />
                <h2 className="text-2xl font-black italic uppercase tracking-tight text-white mt-1">SEPETİM</h2>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                <X size={28} strokeWidth={2.5} />
              </button>
            </div>
            
            {/* İçerik (Boş Sepet Durumu) */}
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
               <div className="w-20 h-20 rounded-full border border-[#222222] flex items-center justify-center mb-5">
                 <ShoppingBag size={36} className="text-[#333333]" />
               </div>
               <h3 className="text-xl font-black italic uppercase text-gray-500">SEPETİNİZ BOŞ</h3>
               <p className="text-gray-600 font-medium mt-2 text-sm">Başlamak için performans parçaları ekleyin.</p>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-[#222222] bg-[#0A0A0A]">
               <div className="flex justify-between items-end mb-5">
                 <span className="text-lg font-bold uppercase text-gray-500 tracking-wider">TOPLAM</span>
                 <span className="text-3xl font-black italic text-white flex gap-1 items-start">
                   <span className="text-base mt-1">₺</span>0
                 </span>
               </div>
               <button className="w-full bg-white text-black py-4 font-black italic uppercase text-lg hover:bg-gray-200 transition-colors tracking-wide outline-none">
                 SİPARİŞİ TAMAMLA
               </button>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
