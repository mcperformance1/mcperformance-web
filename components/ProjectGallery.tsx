"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { ZoomIn } from 'lucide-react';

export default function ProjectGallery({ images }: { images: { url: string; alt: string }[] }) {
  const [index, setIndex] = useState(-1);

  const slides = images.map((img) => ({ src: img.url, alt: img.alt }));

  return (
    <div className="w-full">
      {/* --- IZGARA AYARI ---
          'grid' yapısına geçtik. 
          Mobilde 1, tablette 2, masaüstünde 3 sütun tam 4:3 ralli formatı!
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-zinc-900 bg-zinc-950 transition-all duration-500 hover:border-[#FF5722]/50 shadow-2xl"
            onClick={() => setIndex(idx)}
          >
            {/* --- AKILLI 4:3 ÇERÇEVE --- 
                aspect-[4/3] ile tüm fotoğrafları aynı hizaya soktuk.
                'object-cover' sayesinde dikey fotolar çerçeveyi tam doldurur, sağda solda boşluk kalmaz.
            */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image 
                src={image.url} 
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-w-768px) 100vw, 33vw"
              />
              
              {/* Hover Efekti: Karartma ve Turuncu Zoom İkonu */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                <div className="bg-[#FF5722] p-4 rounded-full shadow-[0_0_25px_rgba(255,87,34,0.6)] transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <ZoomIn className="text-white" size={24} strokeWidth={3} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Akıllı Çerçeve (Lightbox) Ayarları */}
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Zoom]}
        styles={{ 
          container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
          navigationPrev: { color: "#FF5722" },
          navigationNext: { color: "#FF5722" },
        }}
      />
    </div>
  );
}