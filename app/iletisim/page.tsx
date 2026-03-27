"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Iletisim() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6 flex flex-col items-center pb-24 selection:bg-white selection:text-black">
       <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase mb-16 text-center drop-shadow-xl tracking-tighter">İLETİŞİM</h1>
       
       <div className="w-full max-w-2xl border border-[#222222] bg-[#0A0A0A] p-8 md:p-12 shadow-2xl">
          <form className="flex flex-col space-y-8">
             <div>
               <label className="block text-gray-500 font-bold italic mb-3 uppercase tracking-widest text-sm">İSİM SOYİSİM</label>
               <input 
                 type="text" 
                 placeholder="Adınız..."
                 className="w-full bg-[#000000] border border-[#333333] p-5 outline-none focus:border-white transition-colors text-white italic text-lg placeholder-gray-700" 
               />
             </div>
             
             <div>
               <label className="block text-gray-500 font-bold italic mb-3 uppercase tracking-widest text-sm">E-POSTA</label>
               <input 
                 type="email" 
                 placeholder="ornek@mail.com"
                 className="w-full bg-[#000000] border border-[#333333] p-5 outline-none focus:border-white transition-colors text-white italic text-lg placeholder-gray-700" 
               />
             </div>
             
             <div>
               <label className="block text-gray-500 font-bold italic mb-3 uppercase tracking-widest text-sm">MESAJINIZ</label>
               <textarea 
                 rows={5} 
                 placeholder="Aracınız ve siparişinizle ilgili detaylar..."
                 className="w-full bg-[#000000] border border-[#333333] p-5 outline-none focus:border-white transition-colors text-white italic text-lg placeholder-gray-700 resize-none" 
               />
             </div>
             
             <button 
               type="button"
               onClick={() => alert("Mesajınız başarıyla iletildi. En kısa sürede dönüş sağlanacaktır.")}
               className="bg-white text-black font-black italic uppercase text-2xl p-6 hover:bg-gray-200 transition-colors tracking-widest mt-4"
             >
               GÖNDER
             </button>
          </form>
       </div>
       
       <div className="mt-20 flex space-x-8 text-gray-500 font-bold italic uppercase tracking-wider">
         <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
         <a href="#" className="hover:text-white transition-colors">YOUTUBE</a>
         <a href="#" className="hover:text-white transition-colors">WHATSAPP</a>
       </div>
    </div>
  )
}
