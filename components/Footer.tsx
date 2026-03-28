"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full flex-col bg-[#000000] border-t border-[#111111] py-8 px-4 z-20 relative mt-auto flex sm:flex-row justify-between items-center text-[#555555]">
      
      {/* Footer Sol Kısım (Linkler) */}
      <div className="flex space-x-6 font-black tracking-widest italic uppercase text-[10px] mb-6 sm:mb-0">
        <Link href="/" className="hover:text-white transition-colors">ANA SAYFA</Link>
        <Link href="/magaza" className="hover:text-white transition-colors">MAĞAZA</Link>
        <Link href="/projeler" className="hover:text-white transition-colors">PROJELER</Link>
      </div>

      {/* MC Performance Logo (Ortada / Altta) */}
      <div className="flex justify-center mb-6 sm:mb-0">
        <Link href="/">
           <Image 
             src="/mc performance logo.png" 
             alt="MC Performance Logo" 
             width={140} 
             height={50} 
             className="w-32 h-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-500"
             priority
           />
        </Link>
      </div>

      {/* Footer Sağ Kısım (İletişim) */}
      <div className="flex space-x-6 font-bold italic tracking-widest text-[10px] mt-4 sm:mt-0">
        <a href="tel:+905384843361" className="hover:text-[#FF5722] transition-colors">+90 538 484 33 61</a>
      </div>

    </footer>
  );
}
