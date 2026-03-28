"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  mainImage: string;
  galleryImages: string[];
}

export default function ProductGallery({ mainImage, galleryImages }: ProductGalleryProps) {
  // Notion'daki 'Galeri' sütunundan gelen resimleri temizle
  const allImages = galleryImages.filter(Boolean);
  
  // useState ile aktif (büyük) resmi yönetiyoruz
  // Başlangıçta ana resmi göster
  const [activeImage, setActiveImage] = useState(mainImage);

  return (
    <div className="w-full lg:w-[550px] flex flex-col gap-6">
      {/* --- ANA RESİM ÇERÇEVESİ (ESKİ USUL, BOYUTA GÖRE ŞEKİLLENEN) --- 
         'aspect-square' kalktı, 'flex' ile resim neyse o boyuta bürünüyor.
      */}
      <div className="w-full rounded-3xl border border-[#222] bg-zinc-950/50 flex items-center justify-center group overflow-hidden shadow-2xl transition-all duration-300">
        <img 
          src={activeImage} 
          alt="Ürün Görseli" 
          // 'object-contain' yerine resmin kendi doğal oranını koruyan yapı
          className="w-full h-auto max-h-[600px] object-scale-down p-1 group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
      </div>

      {/* --- AKILLI VE CANLI GALERİ KUTUCUKLARI --- */}
      {/* Sadece Galeri doluysa gösterir */}
      {allImages.length > 0 && (
        <div className="flex flex-wrap gap-3 justify-start items-center border-t border-[#222] pt-6">
          
          {/* Önce Ana Resmi de Galeriye ekleyelim (Aktif resmi değiştirmek için) */}
          <button
            onClick={() => setActiveImage(mainImage)} // TIKLAYINCA AKTİF RESMİ DEĞİŞTİR
            className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ease-out ${
              activeImage === mainImage ? 'border-[#FF5722] scale-110 shadow-[0_0_15px_rgba(255,87,34,0.4)]' : 'border-[#222] opacity-60 hover:opacity-100'
            }`}
          >
            <img src={mainImage} alt="Ana Görsel" className="w-full h-full object-cover" />
          </button>

          {/* Galeri sütunundaki diğer resimler */}
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)} // TIKLAYINCA AKTİF RESMİ DEĞİŞTİR
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ease-out ${
                activeImage === img ? 'border-[#FF5722] scale-110 shadow-[0_0_15px_rgba(255,87,34,0.4)]' : 'border-[#222] opacity-60 hover:opacity-100'
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