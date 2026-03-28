"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function BrandsSlider() {
  const brands = [
    "PROTRACK", "WIECHERS", "STOPTECH", "ST SUSPENSION", "TIAL", 
    "AEM", "GOODRIDGE", "BMW OEM PARTS", "MINI OEM PARTS", 
    "MOTUL", "FCP", "POWERFLEX", "K&N"
  ];

  const paddedBrands = [...brands, ...brands, ...brands];

  return (
    <div className="w-full bg-[#000000] py-6 overflow-hidden border-y border-[#222222] flex items-center relative z-20">
      <motion.div
        className="flex space-x-12 md:space-x-20 whitespace-nowrap px-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 35, repeat: Infinity }}
      >
        {paddedBrands.map((brand, i) => (
          <span key={i} className="text-xl md:text-2xl font-black italic text-[#444444] uppercase tracking-wide hover:text-white transition-colors duration-300 cursor-default select-none">
            {brand}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
