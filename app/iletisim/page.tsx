"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Iletisim() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6 flex flex-col items-center pb-24 selection:bg-white selection:text-black">
       <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase mb-16 text-center drop-shadow-xl tracking-tighter">İLETİŞİM</h1>
       
       <div className="w-full max-w-3xl mt-12 px-4 md:px-0">
          <div className="flex flex-col space-y-0">
             
             {/* E-Posta Satırı */}
             <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-b border-[#222] py-8 hover:bg-[#050505] transition-colors duration-500 px-4 md:px-8">
                <span className="text-gray-500 font-bold italic uppercase tracking-widest text-xs md:text-sm mb-2 md:mb-0">E-POSTA</span>
                <span className="text-lg md:text-xl font-bold italic tracking-widest text-white">mcperformance.tr@gmail.com</span>
             </div>
             
             {/* Telefon Satırı */}
             <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#222] py-8 hover:bg-[#050505] transition-colors duration-500 px-4 md:px-8">
                <span className="text-gray-500 font-bold italic uppercase tracking-widest text-xs md:text-sm mb-2 md:mb-0">TELEFON</span>
                <span className="text-lg md:text-xl font-bold italic tracking-widest text-white">+90 538 484 33 61</span>
             </div>

             {/* Buton Satırı */}
             <div className="flex justify-center pt-16">
                <a 
                   href="https://wa.me/905384843361" 
                   target="_blank" 
                   rel="noreferrer"
                   className="bg-[#FF5722] text-white font-bold italic uppercase text-sm md:text-base px-10 py-5 hover:bg-white hover:text-black transition-all duration-500 rounded-full shadow-lg tracking-widest inline-flex items-center"
                >
                   WHATSAPP'TAN BİLGİ ALIN
                </a>
             </div>
             
          </div>
       </div>
       
       <div className="mt-20 flex space-x-8 text-gray-500 font-bold italic uppercase tracking-wider">
         <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
         <a href="#" className="hover:text-white transition-colors">YOUTUBE</a>
         <a href="#" className="hover:text-white transition-colors">WHATSAPP</a>
       </div>
    </div>
  )
}
