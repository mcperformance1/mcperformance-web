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
      {/* 'columns-2 md:columns-3' özelliği sayesinde 
         fotoğraflar boyutu neyse ona göre dizilir (Pinterest tarzı).
         'break-inside-avoid' ise fotoğrafların yarım kalmasını engeller.
      */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((image, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative break-inside-avoid overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-900 cursor-pointer group"
            onClick={() => setIndex(idx)}
          >
            {/* 'fill' yerine 'w-full h-auto' kullanıyoruz ki 
               fotoğrafın kendi en-boy oranı bozulmasın.
            */}
            <img 
              src={image.url} 
              alt={image.alt}
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Hover Efekti */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <div className="bg-[#FF5722] p-3 rounded-full shadow-[0_0_15px_rgba(255,87,34,0.5)]">
                 <ZoomIn className="text-white" size={20} />
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Zoom]}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.98)" } }}
      />
    </div>
  );
}