"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Logoya basınca en üste atan fonksiyon
  const handleLogoClick = () => {
    setIsMenuOpen(false); // Menü açıksa kapat
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 z-[60] w-full bg-black/90 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* LOGO */}
            <Link 
              href="/" 
              onClick={handleLogoClick} 
              className="text-2xl font-black italic tracking-tighter text-white hover:opacity-80 transition-all"
            >
              MC PERFORMANCE
            </Link>

            <div className="flex items-center space-x-6">
              {/* SEPET BUTONU */}
              <button 
                onClick={() => setIsCartOpen(true)} 
                className="relative p-2 text-white hover:scale-110 transition-transform"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 px-2 py-1 text-[10px] font-black bg-white text-black rounded-full leading-none">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* ÜÇ ÇİZGİ MENÜ BUTONU (Z-Index en üstte kalsın diye butona özel ayar) */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="text-white z-[70] p-2 hover:scale-110 transition-transform focus:outline-none"
              >
                {isMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* FULL EKRAN MAT SİYAH MENÜ */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/98 z-[65] flex flex-col items-center justify-center animate-in fade-in duration-300">
          <nav className="flex flex-col gap-8 md:gap-12 text-center">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-4xl md:text-6xl font-black italic hover:text-white text-zinc-500 transition-all uppercase tracking-tighter">
              ANA SAYFA
            </Link>
            <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="text-4xl md:text-6xl font-black italic hover:text-white text-zinc-500 transition-all uppercase tracking-tighter">
              KATALOG
            </Link>
            <Link href="/projects" onClick={() => setIsMenuOpen(false)} className="text-4xl md:text-6xl font-black italic hover:text-white text-zinc-500 transition-all uppercase tracking-tighter">
              PROJELER
            </Link>
            <Link href="/#brands" onClick={() => setIsMenuOpen(false)} className="text-4xl md:text-6xl font-black italic hover:text-white text-zinc-500 transition-all uppercase tracking-tighter">
              MARKALAR
            </Link>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-4xl md:text-6xl font-black italic hover:text-white text-zinc-500 transition-all uppercase tracking-tighter">
              İLETİŞİM
            </Link>
          </nav>
          
          <div className="absolute bottom-12 flex flex-col items-center gap-2">
             <div className="h-px w-12 bg-white/20 mb-4"></div>
             <span className="text-[10px] font-bold tracking-[0.4em] text-zinc-600 uppercase">MC PERFORMANCE // ANTALYA</span>
          </div>
        </div>
      )}
    </>
  );
}
