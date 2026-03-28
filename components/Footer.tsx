"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-zinc-900 py-12 px-6 mt-auto">
      <div className="max-w-screen-2xl mx-auto flex flex-col items-center">
        
        {/* Üst Kısım: Hızlı Linkler */}
        <div className="flex space-x-8 mb-10 font-black tracking-[0.2em] italic uppercase text-[10px] text-zinc-500">
          <Link href="/" className="hover:text-white transition-colors duration-300">ANA SAYFA</Link>
          <Link href="/magaza" className="hover:text-white transition-colors duration-300">MAĞAZA</Link>
          <Link href="/projeler" className="hover:text-white transition-colors duration-300">PROJELER</Link>
          <Link href="/iletisim" className="hover:text-white transition-colors duration-300">İLETİŞİM</Link>
        </div>

        {/* Orta Kısım: MC Performance Logo */}
        <div className="mb-10">
          <Link href="/" className="group">
             <Image 
               src="/image_6.png" 
               alt="MC Performance Logo" 
               width={180} 
               height={60} 
               className="w-40 h-auto object-contain opacity-60 group-hover:opacity-100 transition-all duration-700 filter grayscale group-hover:grayscale-0"
               priority
             />
          </Link>
        </div>

        {/* Alt Kısım: İletişim & Copyright */}
        <div className="flex flex-col items-center space-y-4">
          <a 
            href="tel:+905384843361" 
            className="text-[#FF5722] font-black italic tracking-widest text-[11px] hover:scale-105 transition-transform"
          >
            +90 538 484 33 61
          </a>
          <p className="text-zinc-700 font-bold italic tracking-[0.3em] text-[9px] uppercase">
            © 2026 MC PERFORMANCE - PREMIUM AUTOMOTIVE SOLUTIONS
          </p>
        </div>

      </div>
    </footer>
  );
}