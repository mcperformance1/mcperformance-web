import React from "react";
// dynamic = 'force-dynamic' kısmını sildik çünkü her saniye Notion'a sorması donma yapar.
// revalidate: 3600 yaparak veriyi 1 saat hafızada tutuyoruz, mermi gibi hızlı açılır.
export const revalidate = 3600; 

import Link from "next/link";
import Image from "next/image"; // Resim optimizasyonu için ekledik
import { getAllProjects } from "../../lib/notion";

export default async function Projeler() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen bg-black text-white pt-40 px-6 max-w-screen-2xl mx-auto flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-black italic uppercase mb-16 text-center tracking-tighter text-white drop-shadow-lg">
           PROJELERİMİZ
        </h1>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 pb-32">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <Link 
                key={project.id} 
                href={`/projeler/${project.slug}`}
                className="group flex flex-col border border-[#222222] bg-[#050505] overflow-hidden transition-colors hover:border-[#444444]"
              >
                {/* Araç Fotoğrafı - Next.js Image ile optimize edildi */}
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#111111]">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    sizes="(max-w-768px) 100vw, 50vw"
                    // İlk 2 projeyi öncelikli yükle (LCP iyileştirmesi)
                    priority={index < 2} 
                  />
                </div>
                
                {/* Alt Başlık Alanı */}
                <div className="p-8 flex items-center justify-center border-t border-[#111111]">
                   <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-wider text-center group-hover:text-gray-300 transition-colors">
                     {project.name}
                   </h2>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 font-bold italic col-span-full text-center py-20">Notion'da henüz 'Proje' kategorisinde kayıt bulunmuyor.</p>
          )}
        </div>
    </div>
  );
}