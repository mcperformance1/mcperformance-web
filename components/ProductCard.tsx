"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "../context/CartContext";

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
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: data.id,
      name: data.name,
      slug: data.slug,
      price: data.price,
      image: data.image
    });
  };

  return (
    <Link 
      href={`/product/${data.slug}`} 
      className="group relative flex flex-col border border-[#FF5722] hover:border-transparent bg-[#000000] p-2 md:p-4 overflow-hidden rounded-2xl transition-colors duration-500 cursor-pointer"
    >
      <div className="absolute inset-0 border border-transparent group-hover:border-white/30 transition-colors duration-500 rounded-2xl pointer-events-none" />
      
      {/* Resim alanı (Hover zoom) */}
      <div className="relative w-full aspect-[4/5] object-cover mb-3 md:mb-4 overflow-hidden bg-[#0A0A0A] rounded-xl">
        <motion.div 
           className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
           style={{ backgroundImage: `url(${data.image})` }}
        />
      </div>

      {/* İçerik */}
      <div className="flex flex-col flex-1 mb-3 md:mb-4 px-1">
        <h3 className="text-xs md:text-lg font-bold italic uppercase leading-tight mb-1 tracking-widest text-white">
          {data.name}
        </h3>
        <p className="text-gray-400 font-bold italic tracking-wide text-[10px] md:text-sm">
          {data.price}
        </p>
      </div>

      {/* Tam Genişlikte SEPETE EKLE Butonu */}
      <div className="mt-auto z-10">
        <button 
          className="w-full bg-[#111] text-white group-hover:bg-white group-hover:text-black font-bold italic uppercase text-[9px] md:text-[11px] tracking-widest py-2 md:py-3 rounded-lg transition-colors duration-500"
          onClick={handleAddToCart}
        >
          SEPETE EKLE
        </button>
      </div>
    </Link>
  );
}
