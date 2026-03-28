"use client";
import React, { useState, useEffect } from 'react';

interface ProductGalleryProps {
  mainImage: string;
  galleryImages: string[]; // Notion'daki "Galeri" sütunundan gelen fotolar
}

export default function ProductGallery({ mainImage, galleryImages }: ProductGalleryProps) {
  // 1. ADIM: Notion'daki Galeri sütunundan gelen fotoları al (Boşları temizle)
  // Eğer galeri boşsa sadece ana resmi gösterir, doluysa hepsini listeler
  const allImages = galleryImages && galleryImages.length > 0 ? galleryImages : [mainImage];
  
  // 2. ADIM: Aktif resmi yönet (Başlangıçta ana resmi göster)
  const [activeImage, setActiveImage] = useState(mainImage);

  // Ürün değişirse (sayfa arası geçişte) resmi güncelle
  useEffect(() => {
    setActiveImage(mainImage);
  }, [mainImage]);

  return (
    <div className="w-full lg:w-[550px] flex flex-col gap-8">
      
      {/* --- BÜYÜK FOTOĞRAF ALANI (SIFIRA SIFIR VE TURUNCU DIŞ ÇERÇEVELİ) --- */}
      <div className="w-full rounded-[30px] p-[2px] bg-[#FF5722] shadow-[0_0_25px_rgba(255,87,34,0.4)] overflow-hidden">
        <div className="w-full rounded-[28px] bg-zinc-950 overflow-hidden flex items-center justify-center relative group">
          <img 
            src={activeImage} 
            alt="MC Performance Ürün" 
            className="w-full h-auto block transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        </div>
      </div>

      {/* --- KÜÇÜK GALERİ KUTUCUKLARI (ŞEFFAF VE TIKLANABİLİR) --- */}
      {/* Sadece 1'den fazla fotoğraf varsa veya Notion Galeri doluysa göster */}
      {allImages.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-start items-center">
          
          {/* Önce Ana Resmi Koyalım (Geri dönmek için) */}
          <button
            onClick={() => setActiveImage(mainImage)}
            className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              activeImage === mainImage 
                ? 'border-[#FF5722] scale-110 shadow-[0_0_15px_rgba(255,87,34,0.3)] opacity-100' 
                : 'border-white/10 bg-transparent opacity-40 hover:opacity-100 hover:border-white/30'
            }`}
          >
            <img src={mainImage} alt="Ana Foto" className="w-full h-full object-cover" />
          </button>

          {/* Notion 'Galeri' Sütunundan Gelen Diğer Fotoğraflar */}
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)} // TIKLAYINCA YUKARIYI DEĞİŞTİRİR
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                activeImage === img 
                  ? 'border-[#FF5722] scale-110 shadow-[0_0_15px_rgba(255,87,34,0.3)] opacity-100' 
                  : 'border-white/10 bg-transparent opacity-40 hover:opacity-100 hover:border-white/30'
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