"use client";
import React, { useState } from "react";

export default function ProductGallery({
  mainImage,
  galleryImages
}: {
  mainImage: string;
  galleryImages: string[];
}) {
  const [currentImg, setCurrentImg] = useState(mainImage);
  
  // Eşsiz ve geçerli resimleri alıyoruz, boş veya hatalı varsa filtreliyoruz
  const validGallery = Array.from(new Set([mainImage, ...galleryImages])).filter(img => img && img.trim() !== "");
  const hasGallery = validGallery.length > 1;

  return (
    <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col gap-4">
      {/* Ana Görsel (Adaptif Kutu Boyutu) */}
      <div className="w-full relative flex items-center justify-center border border-[#FF5722] hover:border-transparent transition-colors duration-500 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer z-10 bg-transparent">
        <img 
          src={currentImg} 
          alt="Ürün Ana Görseli"
          className="w-full h-auto max-h-[80vh] object-contain transition-transform hover:scale-[1.03] duration-700 block"
        />
        {/* İnteraktif Çerçeve Hover Efekti (üstüne overlay) */}
        <div className="absolute inset-0 border border-transparent group-hover:border-white/30 transition-colors duration-500 rounded-2xl pointer-events-none" />
      </div>

      {/* Akıllı Dinamik Galeri: Eğer birden fazla resim varsa renderla */}
      {hasGallery && (
        <div className="flex gap-3 w-full overflow-x-auto pb-3 pt-1 scrollbar-none snap-x px-1">
          {validGallery.map((imgUrl, idx) => {
             const isActive = currentImg === imgUrl;
             return (
               <div 
                 key={idx} 
                 onClick={() => setCurrentImg(imgUrl)}
                 className={`w-20 h-20 sm:w-24 sm:h-24 shrink-0 border transition-all duration-300 rounded-xl overflow-hidden cursor-pointer bg-[#0A0A0A] snap-start shadow-md ${
                   isActive 
                     ? 'border-[#FF5722] opacity-100 scale-100' 
                     : 'border-[#222222] opacity-50 hover:opacity-100 hover:border-[#FF5722] hover:scale-[1.03]'
                 }`}
               >
                 <div 
                   className="w-full h-full bg-cover bg-center" 
                   style={{ backgroundImage: `url(${imgUrl})` }} 
                 />
               </div>
             );
          })}
        </div>
      )}
    </div>
  );
}
