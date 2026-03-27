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
      className="group relative flex flex-col border border-[#222222] bg-[#000000] p-5 overflow-hidden transition-colors hover:border-[#444444] cursor-pointer"
    >
      {/* Resim alanı (Hover zoom) */}
      <div className="relative w-full aspect-[4/5] mb-5 overflow-hidden bg-[#0A0A0A] rounded-sm">
        <motion.div 
           className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
           style={{ backgroundImage: `url(${data.image})` }}
        />
      </div>

      {/* İçerik */}
      <div className="flex flex-col flex-1 mb-6">
        <h3 className="text-lg md:text-xl font-black italic uppercase leading-tight mb-2 text-white">
          {data.name}
        </h3>
        <p className="text-gray-400 font-black italic tracking-wider text-base">
          {data.price}
        </p>
      </div>

      {/* Tam Genişlikte SEPETE EKLE Butonu */}
      <div className="mt-auto">
        <button 
          className="w-full bg-white text-black font-black italic uppercase text-sm md:text-base tracking-widest py-3 hover:bg-gray-300 transition-colors"
          onClick={handleAddToCart}
        >
          SEPETE EKLE
        </button>
      </div>
    </Link>
  );
}
