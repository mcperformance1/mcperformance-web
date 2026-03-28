"use client";
import React, { useState, useEffect } from 'react';

interface ProductGalleryProps {
  mainImage: string;
  galleryImages: string[];
}

export default function ProductGallery({ mainImage, galleryImages }: ProductGalleryProps) {
  // Notion'dan gelen resimleri temizle
  const allImages = galleryImages.filter(Boolean);
  
  // Aktif resmi yönetiyoruz
  const [activeImage, setActiveImage] = useState(mainImage);

  // Ürün değişirse resmi sıfırla
  useEffect(() => {
    setActiveImage(mainImage);
  }, [mainImage]);

  return (
    <div className="w-full lg:w-[550px] flex flex-col gap-8">
      
      {/* --- ANA RESİM: DIŞI TURUNCU ÇERÇEVELİ, SIFIRA SIFIR YAPIŞAN --- */}
      <div className="w-full rounded-[30px] p-[2px] bg-[#FF5722] shadow-[0_0_20px_rgba(255,87,34,0.3)] transition-all duration-500 overflow-hidden">
        <div className="w-full rounded-[28px] bg-zinc-950 overflow-hidden flex items-center justify-center relative group">
          
          {/* Üzerine gelince yanan hafif turuncu katman */}
          <div className="absolute inset-0 bg-[#FF5722]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
          
          <img 
            src={activeImage} 
            alt="MC Performance Ürün" 
            // 'w-full h-auto' ve 'block' sayesinde boşluk kalmaz, çerçeveye tam oturur
            className="w-full h-auto block transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        </div>
      </div>

      {/* --- ŞEFFAF GALERİ KUTUCUKLARI (TIKLANABİLİR) --- */}
      {allImages.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-start items-center">
          
          {/* Ana Resim Kutucuğu */}
          <button
            onClick={() => setActiveImage(mainImage)}
            className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              activeImage === mainImage 
                ? 'border-[#FF5722] scale-110 shadow-[0_0_15px_rgba(255,87,34,0.4)]' 
                : 'border-white/10 bg-transparent opacity-40 hover:opacity-100 hover:border-[#FF5722]/50'
            }`}
          >
            <img src={mainImage} alt="Ana" className="w-full h-full object-cover" />
          </button>

          {/* Galeri resimleri (Şeffaf ve tıklanabilir) */}
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)} // TIKLAYINCA YUKARIYI DEĞİŞTİRİR
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                activeImage === img 
                  ? 'border-[#FF5722] scale-110 shadow-[0_0_15px_rgba(255,87,34,0.4)]' 
                  : 'border-white/10 bg-transparent opacity-40 hover:opacity-100 hover:border-[#FF5722]/50'
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