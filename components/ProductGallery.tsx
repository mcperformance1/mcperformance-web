"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  mainImage: string;
  galleryImages: string[];
}

export default function ProductGallery({ mainImage, galleryImages }: ProductGalleryProps) {
  // Tüm resimleri birleştir (Ana resim + Galeri resimleri)
  const allImages = Array.from(new Set([mainImage, ...galleryImages])).filter(Boolean);
  const [activeImage, setActiveImage] = useState(mainImage);

  return (
    <div className="w-full lg:w-[500px] flex flex-col gap-4">
      {/* Büyük Resim Alanı */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-[#222] bg-zinc-950/50 group">
        <Image 
          src={activeImage} 
          alt="Ürün Görseli" 
          fill 
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
          priority
        />
      </div>

      {/* Küçük Resimler (Thumbnails) */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`relative aspect-square rounded-lg overflow-hidden border transition-all duration-300 ${
                activeImage === img ? 'border-[#FF5722] scale-105' : 'border-[#222] opacity-50 hover:opacity-100'
              }`}
            >
              <Image 
                src={img} 
                alt={`Galeri ${idx}`} 
                fill 
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}