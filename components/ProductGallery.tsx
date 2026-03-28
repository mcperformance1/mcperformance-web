"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  mainImage: string;
  galleryImages: string[];
}

export default function ProductGallery({ mainImage, galleryImages }: ProductGalleryProps) {
  // Notion'daki 'Galeri' sütunundan gelen resimleri al, boş olanları temizle
  const allImages = galleryImages.filter(Boolean);
  
  // Başlangıçta ana resmi göster
  const [activeImage, setActiveImage] = useState(mainImage);

  return (
    <div className="w-full lg:w-[550px] flex flex-col gap-6">
      {/* --- ANA ÇERÇEVE --- */}
      <div className="relative aspect-square w-full rounded-3xl overflow-hidden border border-[#222] bg-zinc-950/50 flex items-center justify-center group shadow-2xl">
        <Image 
          src={activeImage} 
          alt="Ürün Görseli" 
          fill 
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-700 ease-in-out"
          priority
        />
      </div>

      {/* --- AKILLI GALERİ KUTUCUKLARI --- */}
      {/* Sadece 1'den fazla resim varsa (Ana resim haricinde Galeri doluysa) gösterir */}
      {allImages.length > 0 && (
        <div className="flex flex-wrap gap-3 justify-start">
          {/* Önce Ana Resmi de Galeriye ekleyelim ki geri dönebilsin */}
          <button
            onClick={() => setActiveImage(mainImage)}
            className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              activeImage === mainImage ? 'border-[#FF5722] scale-110 shadow-[0_0_15px_rgba(255,87,34,0.4)]' : 'border-[#222] opacity-60 hover:opacity-100'
            }`}
          >
            <Image src={mainImage} alt="Ana Görsel" fill className="object-cover" />
          </button>

          {/* Galeri sütunundaki diğer resimler */}
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                activeImage === img ? 'border-[#FF5722] scale-110 shadow-[0_0_15px_rgba(255,87,34,0.4)]' : 'border-[#222] opacity-60 hover:opacity-100'
              }`}
            >
              <Image 
                src={img} 
                alt={`Galeri ${idx + 1}`} 
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