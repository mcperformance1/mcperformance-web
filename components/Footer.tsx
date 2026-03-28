"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-zinc-900 py-12 px-6 mt-auto">
      <div className="max-w-screen-2xl mx-auto flex flex-col items-center">
        
        {/* Üst Linkler */}
        <div className="flex space-x-8 mb-10 font-black tracking-[0.2em] italic uppercase text-[10px] text-zinc-500">
          <Link href="/" className="hover:text-white transition-colors">ANA SAYFA</Link>
          <Link href="/magaza" className="hover:text-white transition-colors">MAĞAZA</Link>
          <Link href="/projeler" className="hover:text-white transition-colors">PROJELER</Link>
          <Link href="/iletisim" className="hover:text-white transition-colors">İLETİŞİM</Link>
        </div>

        {/* Logo (logo.png arıyoruz artık) */}
        <div className="mb-10">
          <Link href="/" className="group">
             <Image 
               src="/logo.png" 
               alt="MC Performance" 
               width={160} 
               height={60} 
               className="w-40 h-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-500"
               priority
             />
          </Link>
        </div>

        {/* Sosyal Medya & İletişim */}
        <div className="flex flex-col items-center space-y-6">
          <a href="tel:+905384843361" className="text-[#FF5722] font-black italic tracking-widest text-[11px]">+90 538 484 33 61</a>
          
          <div className="flex space-x-8 items-center">
            <a href="https://www.instagram.com/mcperformance.tr" target="_blank" className="text-zinc-500 hover:text-white"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
            <a href="https://www.youtube.com/@mcperformance" target="_blank" className="text-zinc-500 hover:text-white"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
          </div>

          <p className="text-zinc-700 font-bold italic tracking-[0.3em] text-[9px]">© 2026 MC PERFORMANCE</p>
        </div>
      </div>
    </footer>
  );
}