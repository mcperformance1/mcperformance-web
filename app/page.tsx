import React from "react";
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { getAllProducts, getUniqueBrands, getAllProjects } from "../lib/notion";

// Animasyonlar SSR uyumlu Client wrapperlarda kalacağı için ana çerçeveyi düz react node kullanarak oluşturuyoruz.
// Veya 'framer-motion' kullanan kısımları client-side olarak ayırabiliriz.
import ClientHero from "../components/ClientHero";
import BrandsSlider from "../components/BrandsSlider";
import FeaturedProducts from "../components/FeaturedProducts";
import ThreeDProjectsGallery from "../components/ThreeDProjectsGallery";

export default async function Home() {
  const products = await getAllProducts();
  const projects = await getAllProjects();

  return (
    <div className="w-full flex flex-col bg-[#000000] min-h-screen selection:bg-white selection:text-black">
      
      {/* ClientHero framer-motion kullandığı için ayrı bir Client Component oldu */}
      <ClientHero />

      {/* INFINITE MARQUEE (MARKALAR) - Client Component */}
      <BrandsSlider />

      {/* CLIENT COMPONENT VİTRİN - Slider & Motion */}
      <FeaturedProducts products={products} />

      {/* DİNAMİK 3D PROJELER VE ÖZEL ÜRETİM GALERİ MODÜLÜ - SSR */}
      <ThreeDProjectsGallery projects={projects} />

    </div>
  );
}
