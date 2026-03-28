"use client";
import React, { useState, useEffect } from 'react';

export default function ProductGallery({ mainImage, galleryImages }: { mainImage: string, galleryImages: string[] }) {
  // Gelen veriyi kontrol etmek için (Boşsa bile hata vermesin)
  const [activeImage, setActiveImage] = useState(mainImage);
  const imagesToShow = galleryImages && galleryImages.length > 0 ? galleryImages : [];

  useEffect(() => {
    setActiveImage(mainImage);
  }, [mainImage]);

  return (
    <div className="w-full lg:w-[500px] flex flex-col gap-6">
      {/* ANA ÇERÇEVE: TURUNCU VE SIFIR BOŞLUK */}
      <div className="w-full rounded-[25px] p-[2px] bg-[#FF5722] shadow-[0_0_30px_rgba(255,87,34,0.4)] transition-all duration-500">
        <div className="w-full rounded-[23px] bg-zinc-950 overflow-hidden flex items-center justify-center relative">
          <img 
            src={activeImage} 
            alt="MC Performance" 
            className="w-full h-auto block object-contain max-h-[550px] transition-transform duration-700 hover:scale-105" 
          />
        </div>
      </div>

      {/* ŞEFFAF KÜÇÜK KUTULAR (NOTION'DAN GELENLER) */}
      <div className="flex flex-wrap gap-3 mt-2">
        {/* Önce Ana Resmi Koyalım */}
        <button
          onClick={() => setActiveImage(mainImage)}
          className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 bg-transparent ${
            activeImage === mainImage 
            ? 'border-[#FF5722] scale-110 shadow-[0_0_15px_rgba(255,87,34,0.3)] opacity-100' 
            : 'border-white/10 opacity-40 hover:opacity-100'
          }`}
        >
          <img src={mainImage} className="w-full h-full object-cover" />
        </button>

        {/* Diğer Galeri Resimleri */}
        {imagesToShow.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveImage(img)}
            className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 bg-transparent ${
              activeImage === img 
              ? 'border-[#FF5722] scale-110 shadow-[0_0_15px_rgba(255,87,34,0.3)] opacity-100' 
              : 'border-white/10 opacity-40 hover:opacity-100'
            }`}
          >
            <img src={img} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}