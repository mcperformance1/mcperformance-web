"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProductProps {
  data: {
    id: string;
    name: string;
    slug: string;
    price: string;
    image: string;
  };
}

export default function ProductCard({ data }: ProductProps) {
  return (
    <Link 
      href={`/product/${data.slug}`} 
      className="group relative block border border-[#222222] bg-[#000000] p-5 flex flex-col overflow-hidden transition-colors hover:border-[#444444] cursor-pointer"
    >
      {/* Resim alanı (Hover zoom) */}
      <div className="relative w-full aspect-[4/5] mb-5 overflow-hidden bg-[#0A0A0A] rounded-sm">
        <motion.div 
           className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
           style={{ backgroundImage: `url(${data.image})` }}
        />
      </div>

      {/* İçerik */}
      <div className="flex flex-col flex-1 relative z-10 pb-4">
        <h3 className="text-lg md:text-xl font-black italic uppercase leading-tight mb-1 text-white pr-10">
          {data.name}
        </h3>
        <p className="text-gray-400 font-bold tracking-wider text-base mt-2">
          {data.price}
        </p>
      </div>

      {/* Sağ Alt "+" Sepet Butonu */}
      <button 
        className="absolute bottom-5 right-5 w-10 h-10 bg-white text-black flex items-center justify-center font-black text-2xl hover:bg-gray-300 transition-colors z-20"
        aria-label="Sepete ekle"
        onClick={(e) => {
          e.preventDefault(); // Sayfa değişimini engeller, sadece sepete ekler
          alert(`${data.name} sepete eklendi!`);
        }}
      >
        +
      </button>
    </Link>
  );
}
