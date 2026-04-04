"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export interface NotionProduct {
  id: string;
  name: string;
  slug: string;
  price: number | string | null;
  image: string;
}

interface FeaturedProductsProps {
  products: NotionProduct[];
}

export default function FeaturedProducts({ products = [] }: FeaturedProductsProps) {
  const [items, setItems] = useState<NotionProduct[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize items and responsive state
  useEffect(() => {
    setItems(products);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [products]);

  // Infinite Sliding Logic
  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      setItems((prevItems) => {
        const newItems = [...prevItems];
        const first = newItems.shift();
        if (first) newItems.push(first);
        return newItems;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [items.length]);

  if (!products || products.length === 0) {
    return null;
  }

  const visibleCount = isMobile ? 2 : 4;
  const visibleItems = items.slice(0, visibleCount);

  const renderPrice = (price: string | number | null) => {
    if (!price) return "FİYAT SORUNUZ";
    
    if (typeof price === 'number') {
      return `${new Intl.NumberFormat('tr-TR').format(price)} ₺`;
    }
    
    // Notion'dan dönen veri direkt string (Örn: "₺1500" veya "3000 TL") ise hiçbir müdahale etmeden direkt döndürüyoruz.
    return price;
  };

  return (
    <section className="bg-[#000000] py-12 lg:py-16 border-t border-b border-[#222222] overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8 lg:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black italic uppercase text-white tracking-widest border-l-4 border-[#FF5722] pl-4">
            Öne Çıkan Ürünler
          </h2>
          <Link 
            href="/magaza" 
            className="text-[#FF5722] hover:text-white font-black italic uppercase tracking-widest text-xs md:text-sm transition-colors border border-[#FF5722]/30 px-4 py-2 rounded-md hover:bg-[#FF5722]/10"
          >
            Tümünü Gör
          </Link>
        </div>

        <div className="relative w-full min-h-[300px]">
          <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  key={product.id}
                  className="group relative flex flex-col bg-[#0A0A0A] border border-white/10 rounded-lg overflow-hidden hover:border-[#FF5722] transition-colors"
                >
                  {/* Aspect 4:3 Image Container */}
                  <Link href={`/product/${product.slug}`} className="block relative w-full aspect-[4/3] overflow-hidden">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#111] flex items-center justify-center">
                        <span className="text-gray-600 font-bold italic uppercase tracking-widest text-xs">Görsel Yok</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </Link>

                  {/* Content Area */}
                  <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="text-white text-sm lg:text-base font-black italic uppercase tracking-wider line-clamp-2 leading-tight group-hover:text-[#FF5722] transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#222]">
                      <span className="text-[#FF5722] font-black italic text-base lg:text-lg tracking-wider drop-shadow-[0_0_8px_rgba(255,87,34,0.3)]">
                        {renderPrice(product.price)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
