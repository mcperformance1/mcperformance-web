"use client";

import { useCart } from "./CartProvider";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export function ProductCard({ product }: { product: Product }) {
  // HATALI OLAN addItem BURADA addToCart OLARAK DÜZELTİLDİ
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-zinc-950 border border-white/5 p-4 transition-all duration-500 hover:border-white/20">
      <div className="relative aspect-square mb-6 overflow-hidden bg-zinc-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-black italic tracking-tighter uppercase text-white group-hover:text-zinc-400 transition-colors">
          {product.name}
        </h3>
        <p className="text-xl font-black text-white">
          {product.price.toLocaleString('tr-TR')} TL
        </p>
      </div>

      <button
        onClick={() => addToCart({ ...product, quantity: 1 })}
        className="w-full mt-6 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] italic transition-all hover:bg-zinc-200 active:scale-95"
      >
        SEPETE EKLE
      </button>
    </div>
  );
}