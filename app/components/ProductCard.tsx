"use client";

import { useCart } from "./CartProvider";
import { CartItem } from "../utils/whatsapp-utils";

export function ProductCard({ product }: { product: CartItem }) {
  const { addItem } = useCart();

  return (
    <div className="group relative border border-white/10 bg-black rounded-sm overflow-hidden transition-all duration-500 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]">
      <div className="aspect-[4/3] w-full relative bg-zinc-900 border-b border-white/10 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-white tracking-wider">{product.name}</h3>
          <p className="text-lg font-semibold text-white ml-4">${product.price.toFixed(2)}</p>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed mb-8 line-clamp-2">High-performance CNC-machined component, engineered for maximum reliability under extreme motorsport conditions.</p>
        <button
          onClick={() => addItem({ ...product, quantity: 1 })}
          className="w-full py-4 px-4 border border-white/20 text-white font-medium text-sm tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
