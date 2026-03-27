"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu as MenuIcon } from "lucide-react";
import Menu from "./Menu";
import CartDrawer from "./CartDrawer";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? "bg-black/95 border-b border-[#111111] py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Sol: Daha Makul Logo */}
          <Link href="/" className="text-xl md:text-2xl font-black italic tracking-tight uppercase text-white drop-shadow-md hover:text-gray-300 transition-colors">
            MC PERFORMANCE
          </Link>
          
          {/* Sağ: İkonlar */}
          <div className="flex items-center space-x-5 md:space-x-8">
            <SearchBar />
            <button onClick={() => setIsCartOpen(true)} className="text-white hover:text-gray-400 transition-colors p-1">
              <ShoppingCart size={22} strokeWidth={2.5} />
            </button>
            <button onClick={() => setIsMenuOpen(true)} className="text-white hover:text-gray-400 transition-colors p-1">
              <MenuIcon size={26} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Hamburger Menu Drawer */}
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Sepet Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
