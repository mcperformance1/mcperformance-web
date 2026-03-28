"use client";
import React, { useState, useEffect } from 'react';

interface ProductGalleryProps {
  mainImage: string;
  galleryImages: string[];
}

export default function ProductGallery({ mainImage, galleryImages }: ProductGalleryProps) {
  // Aktif resmi yönetiyoruz (Tıklayınca değişmesi için)
  const [activeImage, setActiveImage] = useState(mainImage);

  // Ürün değişirse resmi güncelle
  useEffect(() => {
    setActiveImage(mainImage);
  }, [mainImage]);

  return (
    <div className="w-full lg:w-[550px] flex flex-col gap-6">
      
      {/* ANA RESİM ÇERÇEVESİ (SIFIRA SIFIR - TURUNCU) */}
      <div className="w-full rounded-[30px] p-[2px] bg-[#FF5722] shadow-[0_0_20px_rgba(255,87,34,0.3)]">
        <div className="w-full rounded-[28px] bg-zinc-950 overflow-hidden flex items-center justify-center relative">
          <img 
            src={activeImage} 
            alt="Product" 
            className="w-full h-auto block"
          />
        </div>
      </div>

      {/* KÜÇÜK GALERİ KUTULARI (ŞEFFAF VE TIKLANABİLİR) */}
      {(galleryImages && galleryImages.length > 0) && (
        <div className="flex flex-wrap gap-3">
          {/* Önce Ana Resmi de ekleyelim */}
          <button
            onClick={() => setActiveImage(mainImage)}
            className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
              activeImage === mainImage ? 'border-[#FF5722] opacity-100' : 'border-white/10 opacity-40 hover:opacity-100'
            }`}
          >
            <img src={mainImage} className="w-full h-full object-cover" />
          </button>

          {/* Diğer Galeri Resimleri */}
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                activeImage === img ? 'border-[#FF5722] opacity-100' : 'border-white/10 opacity-40 hover:opacity-100'
              }`}
            >
              <img src={img} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}