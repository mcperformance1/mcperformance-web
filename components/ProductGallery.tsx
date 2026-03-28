"use client";
import React, { useState, useEffect } from 'react';

interface ProductGalleryProps {
  mainImage: string;
  galleryImages: string[];
}

export default function ProductGallery({ mainImage, galleryImages }: ProductGalleryProps) {
  // Notion'daki "Galeri" sütunundan gelen fotoları al, boşları temizle
  const allImages = (galleryImages && galleryImages.length > 0) ? galleryImages : [];
  
  // Başlangıçta ana resmi göster, tıklayınca bu değişecek
  const [activeImage, setActiveImage] = useState(mainImage);

  // Ürün sayfası değişirse resmi ana fotoğrafa sıfırla
  useEffect(() => {
    setActiveImage(mainImage);
  }, [mainImage]);

  return (
    <div className="w-full lg:w-[550px] flex flex-col gap-6">
      
      {/* --- ANA RESİM: DIŞI TURUNCU ÇERÇEVELİ, SIFIRA SIFIR YAPIŞIK --- */}
      <div className="w-full rounded-[30px] p-[2px] bg-[#FF5722] shadow-[0_0_20px_rgba(255,87,34,0.3)]">
        <div className="w-full rounded-[28px] bg-zinc-950 overflow-hidden flex items-center justify-center relative group">
          
          {/* Üzerine gelince yanan hafif turuncu katman */}
          <div className="absolute inset-0 bg-[#FF5722]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
          
          <img 
            src={activeImage} 
            alt="MC Performance" 
            className="w-full h-auto block transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        </div>
      </div>

      {/* --- ŞEFFAF GALERİ KUTULARI (TIKLANABİLİR) --- */}
      {/* Sadece galeri doluysa gösterir */}
      <div className="flex flex-wrap gap-3 justify-start items-center">
        
        {/* Önce Ana Resmi Koyuyoruz (Her zaman en başta şeffaf dursun) */}
        <button
          onClick={() => setActiveImage(mainImage)}
          className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
            activeImage === mainImage 
              ? 'border-[#FF5722] scale-110 shadow-[0_0_15px_rgba(255,87,34,0.3)] opacity-100' 
              : 'border-white/10 bg-transparent opacity-40 hover:opacity-100 hover:border-white/30'
          }`}
        >
          <img src={mainImage} alt="Main" className="w-full h-full object-cover" />
        </button>

        {/* Notion'daki Galeri sütunundan gelen resimler */}
        {allImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(img)} // BURASI TIKLAMAYI ÇALIŞTIRAN YER
            className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              activeImage === img 
                ? 'border-[#FF5722] scale-110 shadow-[0_0_15px_rgba(255,87,34,0.3)] opacity-100' 
                : 'border-white/10 bg-transparent opacity-40 hover:opacity-100 hover:border-white/30'
            }`}
          >
            <img 
              src={img} 
              alt={`Gallery ${idx}`} 
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}