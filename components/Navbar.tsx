"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu as MenuIcon } from "lucide-react";
import Menu from "./Menu";
import CartDrawer from "./CartDrawer";
import SearchBar from "./SearchBar";
import MegaMenu from "./MegaMenu";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          isScrolled ? "bg-black/98 border-b border-white/5 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.7)]" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 flex flex-col lg:flex-row lg:items-center relative min-h-12">
          
          {/* ÜST SATIR: LOGO VE İKONLAR */}
          <div className="flex items-center justify-between w-full lg:w-auto">
            {/* SOL: LOGO (AGRESİF VE SERT) */}
            <div className="flex-shrink-0 z-50">
              <Link href="/" className="text-lg md:text-xl font-black italic tracking-tighter uppercase text-white hover:text-[#FF5722] transition-all duration-300">
                MC PERFORMANCE
              </Link>
            </div>

            {/* SAĞ: MOBİL İKONLAR (Sadece Mobilde Yan Yana) */}
            <div className="flex items-center space-x-4 z-50 lg:hidden">
              {/* Sepet - Mobil */}
              <button 
                onClick={() => setIsCartOpen(true)} 
                className="text-white hover:text-[#FF5722] transition-all relative"
              >
                <ShoppingCart size={20} strokeWidth={2.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#FF5722] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center italic">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Hamburger - Mobil */}
              <button onClick={() => setIsMenuOpen(true)} className="text-white hover:text-[#FF5722] transition-all">
                <MenuIcon size={24} strokeWidth={2.5} />
              </button>
            </div>
          </div>
          
          {/* MERKEZ: MEGA MENU (DÜNYANIN MERKEZİ GİBİ TAM ORTADA) */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-full max-w-max px-4">
            <MegaMenu />
          </div>
          
          {/* SAĞ: İKONLAR (DESKTOP İÇİN HIZLI ERİŞİM) */}
          <div className="hidden lg:ml-auto lg:flex items-center space-x-4 md:space-x-7 z-50">
            {/* Arama Butonu - Desktop */}
            <div className="scale-90">
              <SearchBar />
            </div>

            {/* Sepet - Desktop */}
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="group text-white hover:text-[#FF5722] transition-all flex items-center gap-2"
            >
              <div className="relative">
                <ShoppingCart size={20} strokeWidth={2.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#FF5722] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center italic">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="font-black italic text-[11px] tracking-[0.15em] uppercase hidden xl:block">
                  SEPET
              </span>
            </button>

            {/* Hamburger - Desktop */}
            <button onClick={() => setIsMenuOpen(true)} className="text-white hover:text-[#FF5722] transition-all">
              <MenuIcon size={24} strokeWidth={2.5} />
            </button>
          </div>

          {/* MOBİL SEARCH BAR (Logonun Altına Jilet Gibi İndi) */}
          <div className="w-full mt-4 lg:hidden">
            <SearchBar />
          </div>

        </div>
      </header>

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}