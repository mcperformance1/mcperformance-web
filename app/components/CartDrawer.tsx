"use client";

import { useCart } from "./CartProvider";
import Image from "next/image";

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, checkout } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-white/10 shadow-2xl">
          <div className="h-full flex flex-col py-6">
            
            {/* BAŞLIK */}
            <div className="px-4 sm:px-6 flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">SEPETİNİZ</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-white p-2 hover:rotate-90 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ÜRÜN LİSTESİ */}
            <div className="flex-1 px-4 sm:px-6 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-zinc-500">
                  <p className="uppercase tracking-widest text-xs font-bold italic">Sepetiniz şu an boş.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-20 h-20 bg-zinc-900 border border-white/5 flex-shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[11px] font-black uppercase text-white leading-tight">{item.name}</h3>
                        <p className="text-xs text-zinc-400 mt-1 font-bold">{item.price.toLocaleString('tr-TR')} TL</p>
                        <div className="flex items-center gap-4 mt-3">
                          <input 
                            type="number" 
                            min="1"
                            value={item.quantity} 
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="bg-black border border-white/10 text-[10px] w-12 p-1 text-center focus:border-white focus:outline-none text-white font-bold"
                          />
                          <button onClick={() => removeFromCart(item.id)} className="text-[9px] font-black text-red-500 uppercase tracking-widest hover:text-white transition-colors">KALDIR</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ALT TOPLAM VE WHATSAPP BUTONU */}
            {cart.length > 0 && (
              <div className="px-4 sm:px-6 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">TOPLAM TUTAR</span>
                  <span className="text-2xl font-black text-white italic">{totalPrice.toLocaleString('tr-TR')} TL</span>
                </div>
                <button 
                  onClick={checkout}
                  className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] italic hover:bg-zinc-200 transition-all active:scale-95"
                >
                  SİPARİŞİ WHATSAPP'TAN TAMAMLA
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}