"use client";
import React, { useState, useEffect } from 'react';

interface ProductGalleryProps {
  mainImage: string;
  galleryImages: string[];
}

export default function ProductGallery({ mainImage, galleryImages }: ProductGalleryProps) {
  // 1. ADIM: Tüm resimleri tek bir dizide topla ve boş olanları temizle
  // Notion'dan gelen galeri boşsa bile sadece ana resmi gösterir
  const allPhotos = [mainImage, ...(galleryImages || [])].filter(Boolean);
  
  // 2. ADIM: Aktif resim state'i
  const [activeImage, setActiveImage] = useState(mainImage);

  // Ürün değişirse (sayfa arası geçişte) resmi ana fotoğrafa sıfırla
  useEffect(() => {
    setActiveImage(mainImage);
  }, [mainImage]);

  return (
    <div className="w-full lg:w-[550px] flex flex-col gap-6">
      
      {/* --- ANA BÜYÜK RESİM (DIŞI TURUNCU, İÇİ SIFIRA SIFIR) --- */}
      <div className="w-full rounded-[30px] p-[2px] bg-[#FF5722] shadow-[0_0_25px_rgba(255,87,34,0.4)]">
        <div className="w-full rounded-[28px] bg-zinc-950 overflow-hidden flex items-center justify-center relative group">
          <img 
            src={activeImage} 
            alt="MC Performance Product" 
            className="w-full h-auto block transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        </div>
      </div>

      {/* --- KÜÇÜK GALERİ KUTULARI (ŞEFFAF VE TIKLANABİLİR) --- */}
      {allPhotos.length > 1 && (
        <div className="flex flex-wrap gap-3 justify-start items-center">
          {allPhotos.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                console.log("Resim değişti:", img); // Hata ayıklama için: Console'da gör
                setActiveImage(img);
              }}
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                activeImage === img 
                  ? 'border-[#FF5722] scale-110 shadow-[0_0_15px_rgba(255,87,34,0.3)] opacity-100' 
                  : 'border-white/10 bg-transparent opacity-40 hover:opacity-100 hover:border-white/30'
              }`}
            >
              <img 
                src={img} 
                alt={`Gallery thumb ${idx}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}