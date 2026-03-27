"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ClientMarquee({ brands }: { brands: string[] }) {
  if (!brands || brands.length === 0) return null;

  const paddedBrands = [...brands, ...brands, ...brands];

  return (
    <div className="w-full bg-[#0A0A0A] py-8 overflow-hidden border-y border-[#1A1A1A] flex items-center relative z-20">
      <motion.div
        className="flex space-x-12 md:space-x-24 whitespace-nowrap px-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 30, repeat: Infinity }}
      >
        {paddedBrands.map((brand, i) => (
          <Link key={i} href={`/marka/${encodeURIComponent(brand.toLowerCase())}`}>
            <span className="text-2xl md:text-3xl font-black italic text-[#333333] uppercase tracking-tight hover:text-white transition-colors duration-300 cursor-pointer">
              {brand}
            </span>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
