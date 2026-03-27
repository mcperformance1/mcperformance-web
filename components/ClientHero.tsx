"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ClientHero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1920&auto=format&fit=crop')" }}
      />
      <div className="absolute inset-0 z-10 bg-[#000000]/80 mix-blend-multiply" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]/60" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
        className="relative z-20 w-full text-center px-4 flex flex-col items-center justify-center pt-16"
      >
        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black italic uppercase tracking-tighter text-white leading-none drop-shadow-2xl">
          MC PERFORMANCE
        </h1>
        <motion.p 
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4, duration: 0.8 }}
           className="text-gray-400 font-bold italic tracking-widest text-base md:text-xl mt-4 mb-8 max-w-2xl px-4 drop-shadow-lg"
        >
           Otomotiv Performans & Mühendislik
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link 
            href="/magaza"
            className="text-white border-b border-white/50 pb-1 px-2 font-light italic tracking-widest text-sm md:text-base hover:text-gray-300 hover:border-white transition-colors uppercase"
          >
            TÜM MAĞAZAYI İNCELE
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
