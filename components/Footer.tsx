"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#000000] border-t border-[#111111] py-4 px-4 z-20 relative mt-auto flex flex-col sm:flex-row justify-between items-center text-[#555555]">
      
      <div className="flex space-x-6 font-black tracking-widest italic uppercase text-[10px]">
        <Link href="/" className="hover:text-white transition-colors">ANA SAYFA</Link>
        <Link href="/magaza" className="hover:text-white transition-colors">MAĞAZA</Link>
        <Link href="/projeler" className="hover:text-white transition-colors">PROJELER</Link>
      </div>

      <div className="flex space-x-6 font-bold italic tracking-widest text-[10px] mt-4 sm:mt-0">
        <a href="tel:+905384843361" className="hover:text-white transition-colors border-b border-[#222222] pb-0.5">+90 538 484 33 61</a>
      </div>

    </footer>
  );
}
