import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface NotionProjectItem {
  id: string;
  name: string;
  slug: string;
  brand?: string;
  image: string;
  desc?: string;
  category?: string;
  type?: string;
  specs?: Record<string, string>;
}

interface ThreeDProjectsGalleryProps {
  projects: NotionProjectItem[];
}

export default function ThreeDProjectsGallery({ projects = [] }: ThreeDProjectsGalleryProps) {
  // Sadece Kategori, Tür veya Özellikler kısmında "3d" ifadesi geçen projeleri filtreliyoruz
  const threeDProjects = projects.filter((project) => {
    const cat = project.category?.toLowerCase() || "";
    const type = project.type?.toLowerCase() || "";
    const specsText = Object.values(project.specs || {}).join(" ").toLowerCase();
    return cat.includes("3d") || type.includes("3d") || specsText.includes("3d");
  });

  // En popüler/ilk 4 projeyi listele
  const visibleProjects = threeDProjects.slice(0, 4);

  if (visibleProjects.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#000000] py-16 lg:py-24 border-b border-[#222222]">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        {/* Başlık Alanı */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="flex flex-col">
            <span className="text-[#FF5722] text-xs md:text-sm font-black italic uppercase tracking-[0.25em] mb-2">
              ÖZEL MÜHENDİSLİK & CAD TASARIM
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black italic uppercase text-white tracking-widest border-l-4 border-[#FF5722] pl-4 leading-none">
              3D PROJELER & ÖZEL ÜRETİM
            </h2>
          </div>
          <p className="text-gray-400 text-xs md:text-sm font-bold italic uppercase tracking-wider max-w-md md:text-right">
            Tersine mühendislik ve endüstriyel 3D yazıcı teknolojileriyle hayata geçirilen yüksek performanslı otomotiv çözümleri.
          </p>
        </div>

        {/* Galeri Grid Düzeni (4 Sütun) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProjects.map((project) => {
            // Araç bilgisi tespiti (Notion brand sütunu veya specs içinden)
            const vehicle = project.brand || project.specs?.["Araç"] || project.specs?.["Araç Modeli"] || "Custom Özel Tasarım";
            
            // Google Bot için yoğun LSI anahtar kelimeli, otomatik doldurulan ALT etiketi kurgusu
            const seoAlt = `MC Performance ${project.name} - ${vehicle} için 3D printer filament teknolojisi, CAD çizim ve tersine mühendislik ile üretilen custom oto yedek parça aparatı. ${project.desc || ""}`.trim().slice(0, 150);

            return (
              <Link
                key={project.id}
                href={`/projeler/${project.slug}`}
                className="group relative flex flex-col bg-[#050505] border border-white/5 hover:border-[#FF5722] transition-colors duration-500 rounded-2xl overflow-hidden"
              >
                {/* 4:3 Ralli Formatı Resim Taşıyıcısı */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0A0A0A]">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={seoAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                      priority={false}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#111] flex items-center justify-center">
                      <span className="text-gray-600 font-bold italic uppercase tracking-widest text-xs">
                        Proje Görseli Yok
                      </span>
                    </div>
                  )}
                  {/* Premium Karartma Maskesi */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                </div>

                {/* Kart Bilgi Alanı */}
                <div className="p-5 flex flex-col flex-1 justify-between border-t border-[#111111] bg-gradient-to-b from-[#050505] to-[#0A0A0A]">
                  <div className="flex flex-col gap-2">
                    {/* Hangi Araç İçin Yapıldığı */}
                    <span className="text-[#FF5722] text-[10px] font-black italic uppercase tracking-widest">
                      {vehicle}
                    </span>
                    {/* Projenin Adı */}
                    <h3 className="text-white text-base lg:text-lg font-black italic uppercase tracking-wider line-clamp-2 leading-tight group-hover:text-[#FF5722] transition-colors duration-300">
                      {project.name}
                    </h3>
                  </div>

                  {/* Detayları İncele Buton Hissi */}
                  <div className="mt-4 pt-3 border-t border-[#151515] flex items-center justify-between">
                    <span className="text-gray-500 group-hover:text-white text-[10px] font-black italic uppercase tracking-wider transition-colors duration-300">
                      İNCELE & BİLGİ AL
                    </span>
                    <span className="text-gray-600 group-hover:text-[#FF5722] transition-colors duration-300">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Büyük Turuncu CTA Butonu */}
        <div className="mt-16 text-center">
          <Link
            href="/3d-baski-hizmeti"
            className="inline-block bg-[#FF5722] text-white hover:bg-white hover:text-black font-black italic uppercase text-xs md:text-sm tracking-widest px-8 py-5 transition-all duration-500 border border-[#FF5722] shadow-[0_0_20px_rgba(255,87,34,0.15)] hover:shadow-[0_0_30px_rgba(255,87,34,0.3)] hover:-translate-y-0.5"
          >
            TÜM 3D İŞLERİMİZİ İNCELEYİN
          </Link>
        </div>
      </div>
    </section>
  );
}
