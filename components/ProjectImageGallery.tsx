"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ProjectImageGalleryProps {
  mainImage: string;
  galleryImages: string[];
}

export default function ProjectImageGallery({ mainImage, galleryImages }: ProjectImageGalleryProps) {
  const [activeImg, setActiveImg] = useState(mainImage);
  
  // Ana görseli ilk sıraya alıp galerideki görselleri birleştiririz. 
  // Tekrar edenleri filter ile eliyoruz.
  const allImages = Array.from(new Set([mainImage, ...(galleryImages || [])]));

  return (
    <div className="w-full flex flex-col gap-4">
      {/* ANA GÖRSEL */}
      <div className="w-full aspect-[4/3] bg-[#0A0A0A] border border-zinc-900 relative overflow-hidden rounded-md group shadow-xl">
        {activeImg ? (
          <Image
            src={activeImg}
            alt="Proje Ana Görseli"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#111]">
            <span className="text-zinc-600 font-bold italic uppercase">Görsel Yok</span>
          </div>
        )}
      </div>

      {/* KÜÇÜK GALERİ (THUMBNAILS) */}
      {allImages.length > 1 && (
        <div className="w-full flex gap-3 overflow-x-auto pb-3 scrollbar-hide snap-x touch-pan-x">
          {allImages.map((img, idx) => {
            const isActive = activeImg === img;
            return (
              <button
                key={idx}
                onClick={() => setActiveImg(img)}
                title="Görseli Büyüt"
                className={`relative flex-shrink-0 w-24 md:w-32 aspect-[4/3] bg-black border-2 transition-all duration-300 overflow-hidden rounded-sm snap-start ${
                  isActive 
                    ? "border-[#FF5722] opacity-100 shadow-[0_0_15px_rgba(255,87,34,0.3)]" 
                    : "border-zinc-900 opacity-50 hover:opacity-100 hover:border-zinc-700"
                }`}
              >
                <Image
                  src={img}
                  alt={`Galeri Kesiti ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
