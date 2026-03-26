"use client";

import { useCart } from "./CartProvider";
import { generateWhatsAppLink } from "../utils/whatsapp-utils";
import Image from "next/image";

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, removeItem, updateQuantity, totalPrice } = useCart();
  const PHONE_NUMBER = "905384843361"; 

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    const link = generateWhatsAppLink(items, PHONE_NUMBER);
    window.open(link, "_blank");
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-zinc-950 border-l border-white/10 shadow-2xl flex flex-col pt-6 pb-8 transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between px-6 mb-6">
          <h2 className="text-lg font-medium text-white tracking-widest uppercase">Your Cart</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="text-slate-400 hover:text-white focus:outline-none transition-colors"
          >
            <span className="sr-only">Close cart</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <ul className="divide-y divide-white/5">
              {items.map((item) => (
                <li key={item.id} className="py-6 flex items-center space-x-6">
                  <div className="w-20 h-20 bg-zinc-900 overflow-hidden rounded relative border border-white/5 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between text-base font-medium text-white">
                        <h3>{item.name}</h3>
                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-4">
                      <div className="flex items-center border border-white/10 rounded">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-white/5 text-slate-300 transition-colors"
                        >-</button>
                        <span className="px-3 text-white">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-white/5 text-slate-300 transition-colors"
                        >+</button>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => removeItem(item.id)}
                        className="font-medium text-slate-400 hover:text-white transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/10 px-6 py-6 mt-auto">
            <div className="flex justify-between text-base font-medium text-white mb-6">
              <p>Subtotal</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-white text-black py-4 font-semibold text-lg tracking-wide hover:bg-slate-200 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <span>Checkout via WhatsApp</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M12.031 0C5.38 0 0 5.378 0 12.029c0 2.656.84 5.152 2.378 7.236L.268 24l4.904-2.074A11.966 11.966 0 0012.031 24c6.65 0 12.03-5.38 12.03-12.03A12.035 12.035 0 0012.031 0zm0 22.028a9.96 9.96 0 01-5.115-1.401l-.367-.217-3.642 1.54 1.564-3.551-.237-.378a9.965 9.965 0 01-1.528-5.319c0-5.513 4.49-10.003 10.003-10.003A10.008 10.008 0 0122.034 12.03c0 5.512-4.49 10-10.003 10zm5.492-7.514c-.301-.151-1.782-.88-2.058-.981-.277-.101-.478-.151-.68.151-.201.302-.78 .98-.956 1.182-.176.202-.352.227-.654.076-.301-.15-1.272-.469-2.424-1.496-.897-.8-1.503-1.787-1.68-2.09-.176-.301-.019-.465.132-.615.136-.136.301-.352.452-.528.151-.176.201-.302.301-.503.1-.202.05-.378-.025-.528-.076-.151-.68-1.637-.932-2.242-.244-.588-.492-.508-.68-.517-.176-.008-.377-.008-.578-.008s-.528.075-.805.377c-.277.302-1.056 1.032-1.056 2.516s1.082 2.915 1.232 3.116c.151.202 2.126 3.245 5.148 4.548.718.31 1.28.495 1.717.634.721.229 1.378.196 1.896.119.58-.087 1.782-.728 2.033-1.432.251-.703.251-1.306.176-1.432-.075-.126-.277-.202-.578-.353z"/>
              </svg>
            </button>
            <p className="mt-4 text-xs text-center text-slate-400">
              Tax and shipping calculated during chat inquiry.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
