"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const parsePrice = (priceStr: string) => {
    const numStr = priceStr.replace(/[^0-9]/g, "");
    return Number(numStr) || 0;
  };

  const totalPrice = cart.reduce((total, item) => total + (parsePrice(item.price) * item.quantity), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const orderText = cart.map(item => `- ${item.name} (${item.quantity} Adet) -> ${item.price}`).join("\n");
    const totalText = `\n\nSistem Toplamı: ₺${totalPrice.toLocaleString('tr-TR')}`;
    const whatsappText = encodeURIComponent(`Merhaba, web sitenizden aşağıdaki ürünleri inceledim ve sipariş vermek istiyorum:\n\n${orderText}${totalText}`);
    window.open(`https://wa.me/905384843361?text=${whatsappText}`, "_blank");
  };

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
            className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-[#000000] z-50 flex flex-col border-l border-[#222222]"
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
            
            {/* İçerik */}
            {cart.length === 0 ? (
              <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                 <div className="w-20 h-20 rounded-full border border-[#222222] flex items-center justify-center mb-5">
                   <ShoppingBag size={36} className="text-[#333333]" />
                 </div>
                 <h3 className="text-xl font-black italic uppercase text-gray-500">SEPETİNİZ BOŞ</h3>
                 <p className="text-gray-600 font-medium mt-2 text-sm">Başlamak için performans parçaları ekleyin.</p>
              </div>
            ) : (
              <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto w-full">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-[#111111] pb-4">
                     <Link 
                       href={`/product/${item.slug}`}
                       onClick={onClose}
                       className="w-20 h-20 bg-[#0a0a0a] border border-[#222] bg-cover bg-center shrink-0 hover:opacity-80 transition-opacity" 
                       style={{ backgroundImage: `url(${item.image})` }} 
                     />
                     <div className="flex flex-col flex-1 justify-between py-1">
                        <div>
                           <Link 
                             href={`/product/${item.slug}`}
                             onClick={onClose}
                             className="text-white hover:text-[#FF5722] transition-colors font-black italic uppercase text-sm leading-tight pr-4 block"
                           >
                             {item.name}
                           </Link>
                           <div className="text-gray-400 font-black italic text-xs mt-1">
                             {item.price}
                           </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                           {/* Adet Kontrolü */}
                           <div className="flex items-center space-x-3 bg-[#111] px-2 py-1 rounded-sm border border-[#222]">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="text-gray-400 hover:text-white transition-colors px-1 font-black"
                              >
                                -
                              </button>
                              <span className="text-white font-black italic text-sm w-4 text-center">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="text-gray-400 hover:text-white transition-colors px-1 font-black"
                              >
                                +
                              </button>
                           </div>

                           <button 
                             onClick={() => removeFromCart(item.id)}
                             className="text-red-500 hover:text-white transition-colors font-black italic text-[10px] uppercase flex items-center gap-1 w-max"
                           >
                             <Trash2 size={12} /> SİL
                           </button>
                        </div>
                     </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Footer */}
            <div className="p-6 border-t border-[#222222] bg-[#0A0A0A]">
               <div className="flex justify-between items-end mb-5">
                 <span className="text-lg font-black italic uppercase text-gray-500 tracking-wider">TOPLAM</span>
                 <span className="text-3xl font-black italic text-white flex gap-1 items-start">
                   <span className="text-base mt-2">₺</span>{totalPrice.toLocaleString('tr-TR')}
                 </span>
               </div>
               
               {cart.length > 0 ? (
                 <button 
                   onClick={handleCheckout}
                   className="w-full bg-[#FF5722] text-white py-4 font-black italic uppercase text-lg hover:bg-white hover:text-black transition-colors tracking-wide outline-none flex items-center justify-center gap-2"
                 >
                   WHATSAPP'TAN SİPARİŞ VER
                 </button>
               ) : (
                 <button 
                   disabled
                   className="w-full bg-[#222] text-gray-500 py-4 font-black italic uppercase text-lg cursor-not-allowed tracking-wide outline-none"
                 >
                   SİPARİŞİ TAMAMLA
                 </button>
               )}
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
