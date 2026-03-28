"use client";
import React, { useState, useEffect } from 'react';

interface ProductGalleryProps {
  mainImage: string;
  galleryImages: string[];
}

export default function ProductGallery({ mainImage, galleryImages }: ProductGalleryProps) {
  // Notion'dan gelen resimleri temizle (null/undefined olanları at)
  const allImages = galleryImages.filter(Boolean);
  
  // Aktif resmi yönetiyoruz
  const [activeImage, setActiveImage] = useState(mainImage);

  // Prop değişirse (başka ürüne geçilirse) resmi sıfırla
  useEffect(() => {
    setActiveImage(mainImage);
  }, [mainImage]);

  return (
    <div className="w-full lg:w-[550px] flex flex-col gap-6">
      {/* --- ANA ÇERÇEVE: SIFIRA SIFIR YAPIŞAN --- */}
      <div className="w-full rounded-[30px] border border-[#222] bg-zinc-950/50 flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-300 relative group">
        
        {/* Üzerine gelince yanan Turuncu Katman (Hover Efekti) */}
        <div className="absolute inset-0 bg-[#FF5722]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
        
        <img 
          src={activeImage} 
          alt="MC Performance Ürün" 
          // 'w-full h-auto' sayesinde resim çerçeveye tam yapışır, boşluk kalmaz
          className="w-full h-auto object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* --- GALERİ KUTUCUKLARI (TIKLANABİLİR) --- */}
      {allImages.length > 0 && (
        <div className="flex flex-wrap gap-3 justify-start items-center">
          
          {/* Önce Ana Resim (Geri dönmek için) */}
          <button
            onClick={() => setActiveImage(mainImage)}
            className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              activeImage === mainImage 
                ? 'border-[#FF5722] scale-110 shadow-[0_0_15px_rgba(255,87,34,0.4)]' 
                : 'border-[#222] opacity-60 hover:opacity-100 hover:border-[#FF5722]/50'
            }`}
          >
            <img src={mainImage} alt="Ana" className="w-full h-full object-cover" />
          </button>

          {/* Galeri resimleri */}
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)} // TIKLAYINCA YUKARIDAKİ RESİM DEĞİŞİR
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                activeImage === img 
                  ? 'border-[#FF5722] scale-110 shadow-[0_0_15px_rgba(255,87,34,0.4)]' 
                  : 'border-[#222] opacity-60 hover:opacity-100 hover:border-[#FF5722]/50'
              }`}
            >
              <img 
                src={img} 
                alt={`Galeri ${idx + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}