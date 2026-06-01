import React from "react";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getAllProjects } from "../../lib/notion";

// SEO Metadata Optimizasyonu
export const metadata: Metadata = {
  title: "3D Baskı Hizmeti, Tersine Mühendislik & Özel Üretim Parçalar",
  description: "Endüstriyel 3D printer filament teknolojisi, milimetrik CAD çizim ve otomotiv odaklı tersine mühendislik çözümleri. Custom yedek parça ve özel üretim.",
  keywords: [
    "3D baskı hizmeti",
    "3D printer filament",
    "custom oto yedek parça",
    "tersine mühendislik",
    "CAD çizim",
    "3D tarama otomotiv",
    "karbon fiber parça üretimi",
    "MC Performance 3D",
  ],
  openGraph: {
    title: "3D Baskı Hizmeti, Tersine Mühendislik & Özel Üretim | MC Performance",
    description: "Endüstriyel 3D printer filament teknolojisi ve milimetrik CAD çizimle aracınıza özel yüksek performanslı parça üretimi.",
    url: "https://mcperformance.com.tr/3d-baski-hizmeti",
    type: "website",
  },
};

export default async function ThreeDServicePage() {
  // Notion'daki tüm projeleri dinamik olarak çekiyoruz
  const allProjects = await getAllProjects();

  // Sadece Kategori, Tür veya Özellikler kısmında "3d" ifadesi geçen projeleri filtreliyoruz
  const projects = allProjects.filter((project) => {
    const cat = project.category?.toLowerCase() || "";
    const type = project.type?.toLowerCase() || "";
    const specsText = Object.values(project.specs || {}).join(" ").toLowerCase();
    return cat.includes("3d") || type.includes("3d") || specsText.includes("3d");
  });

  // Yapılandırılmış Veri (JSON-LD Schema) - Google Botlarının Sayfayı Çok Daha İyi Anlamasını Sağlar
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "3D Baskı Hizmeti, Tersine Mühendislik & Özel Otomotiv Üretimi",
    "serviceType": "Otomotiv Parçaları 3D Tasarım ve Baskı Hizmetleri",
    "provider": {
      "@type": "LocalBusiness",
      "name": "MC Performance",
      "image": "https://mcperformance.com.tr/icon.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Istanbul",
        "addressCountry": "TR"
      }
    },
    "description": "Tersine mühendislik, CAD çizim ve endüstriyel 3D printer filament teknolojisiyle yüksek mukavemetli özel otomotiv yedek parçası üretimi.",
    "areaServed": "TR",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "3D Baskı ve Özel Üretim Çözümleri",
      "itemListElement": projects.map((project, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": project.name,
          "description": project.desc || `${project.name} özel tasarım otomotiv projesi`,
          "url": `https://mcperformance.com.tr/projeler/${project.slug}`
        }
      }))
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-36 pb-24 selection:bg-[#FF5722] selection:text-white">
      {/* Google Bot için Yapılandırılmış Veri Ekleme */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        {/* HERO SEO Girişi / Üst Alan */}
        <div className="max-w-4xl mx-auto text-center mb-20 flex flex-col items-center">
          <span className="text-[#FF5722] text-sm font-black italic uppercase tracking-[0.3em] mb-4">
            MC PERFORMANCE LAB
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black italic uppercase leading-none tracking-tighter mb-8 text-center drop-shadow-md">
            3D BASKI HİZMETİ & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-[#FF5722]">
              TERSİNE MÜHENDİSLİK
            </span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-3xl text-center">
            Aracınız için bulunamayan, üretimi durdurulmuş veya tamamen size özel geliştirilmesini istediğiniz parçaları hayata geçiriyoruz. 
            Mühendislik ekibimiz, milimetrik lazer tarama, hassas **CAD çizim** optimizasyonu ve en üst kalite **3D printer filament** 
            materyalleri (PETG, ASA, Karbon Elyaf Takviyeli PA12 vb.) kullanarak **custom oto yedek parça** üretimini baştan sona gerçekleştirir.
          </p>
        </div>

        {/* LSI DESTEKLİ HİZMET AVANTAJLARI (SEO Bloğu) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-6xl mx-auto">
          <div className="bg-[#050505] border border-white/5 p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-[#FF5722] text-3xl font-black italic mb-4">01 /</div>
              <h2 className="text-xl font-black italic uppercase tracking-wider mb-3 text-white">Tersine Mühendislik</h2>
              <p className="text-gray-400 text-xs font-bold italic uppercase tracking-wide leading-relaxed">
                Mevcut hasarlı veya orijinal parçaları 3D lazer tarama teknolojisiyle dijital ortama aktarıyor, yapısal zayıflıkları gidererek yeniden tasarlıyoruz.
              </p>
            </div>
          </div>

          <div className="bg-[#050505] border border-[#FF5722]/30 p-8 rounded-2xl flex flex-col justify-between shadow-[0_0_15px_rgba(255,87,34,0.05)]">
            <div>
              <div className="text-[#FF5722] text-3xl font-black italic mb-4">02 /</div>
              <h2 className="text-xl font-black italic uppercase tracking-wider mb-3 text-white">CAD Çizim & Optimizasyon</h2>
              <p className="text-gray-400 text-xs font-bold italic uppercase tracking-wide leading-relaxed">
                Hava akış kanalları, aerodinamik ek parçalar ve montaj braketleri gibi parçaları aracın orijinal şasi ve montaj hatlarıyla kusursuz eşleşecek şekilde modelliyoruz.
              </p>
            </div>
          </div>

          <div className="bg-[#050505] border border-white/5 p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-[#FF5722] text-3xl font-black italic mb-4">03 /</div>
              <h2 className="text-xl font-black italic uppercase tracking-wider mb-3 text-white">Fonksiyonel 3D Filament</h2>
              <p className="text-gray-400 text-xs font-bold italic uppercase tracking-wide leading-relaxed">
                Sıradan plastikler yerine kimyasal direnci yüksek, ısıya dayanıklı (100°C+), esnemeyen Karbon Fiber dolgulu ve ASA bazlı endüstriyel hammaddeler kullanıyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* PROJE GALERİ BÖLÜMÜ */}
        <div className="border-t border-[#111111] pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic uppercase tracking-widest text-white border-l-4 border-[#FF5722] pl-4">
              ÜRETİM PORTFÖYÜMÜZ VE PROJELER
            </h2>
            <p className="text-gray-500 text-xs font-bold italic uppercase tracking-widest md:text-right">
              Notion Veri Tabanından Dinamik Eş zamanlı Akış
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map((project) => {
                const vehicle = project.brand || project.specs?.["Araç"] || project.specs?.["Araç Modeli"] || "Custom Özel Tasarım";
                const seoAlt = `MC Performance ${project.name} - ${vehicle} için 3D printer filament teknolojisi, CAD çizim ve tersine mühendislik ile üretilen custom oto yedek parça aparatı. ${project.desc || ""}`.trim().slice(0, 150);

                return (
                  <Link
                    key={project.id}
                    href={`/projeler/${project.slug}`}
                    className="group relative flex flex-col bg-[#050505] border border-white/5 hover:border-[#FF5722] transition-colors duration-500 rounded-2xl overflow-hidden"
                  >
                    {/* Resim Alanı */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0A0A0A]">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={seoAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#111] flex items-center justify-center">
                          <span className="text-gray-600 font-bold italic uppercase tracking-widest text-xs">Görsel Yok</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    </div>

                    {/* Detaylar */}
                    <div className="p-5 flex flex-col flex-1 justify-between bg-gradient-to-b from-[#050505] to-[#0A0A0A] border-t border-[#111111]">
                      <div className="flex flex-col gap-2">
                        <span className="text-[#FF5722] text-[10px] font-black italic uppercase tracking-widest">
                          {vehicle}
                        </span>
                        <h3 className="text-white text-base lg:text-lg font-black italic uppercase tracking-wider line-clamp-2 leading-tight group-hover:text-[#FF5722] transition-colors duration-300">
                          {project.name}
                        </h3>
                        {project.desc && (
                          <p className="text-gray-400 text-xs font-medium line-clamp-3 leading-relaxed mt-2 normal-case font-sans">
                            {project.desc}
                          </p>
                        )}
                      </div>

                      <div className="mt-6 pt-3 border-t border-[#151515] flex items-center justify-between">
                        <span className="text-gray-500 group-hover:text-white text-[10px] font-black italic uppercase tracking-wider transition-colors duration-300 font-mono">
                          DETAYLARI GÖR
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
          ) : (
            <p className="text-gray-500 font-bold italic text-center py-24 border border-dashed border-white/5 rounded-2xl">
              Notion veri tabanında henüz kayıtlı 3D projesi bulunmuyor. Lütfen panelle senkronize ediniz.
            </p>
          )}
        </div>

        {/* CTA BÖLÜMÜ: SİPARİŞ / BİLGİ ALMA PANELİ */}
        <section className="mt-28 bg-gradient-to-r from-[#050505] via-[#0A0A0A] to-[#050505] border border-white/5 hover:border-[#FF5722]/40 rounded-3xl p-8 md:p-12 lg:p-16 max-w-5xl mx-auto transition-all duration-500 text-center flex flex-col items-center">
          <span className="text-[#FF5722] text-xs font-black italic uppercase tracking-[0.25em] mb-4">
            KENDİ PROJENİZİ BAŞLATIN
          </span>
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-wider text-white mb-6 leading-tight">
            CUSTOM 3D SİPARİŞİ VE TERSİNE MÜHENDİSLİK TALEBİ
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed mb-8 normal-case font-sans">
            Aracınız için tasarlatmak istediğiniz gösterge yuvaları, fren soğutma kanalları, gövde parçaları veya özel aparatlar için 
            uzman ekibimizle görüşün. Görsel, teknik çizim veya fikirlerinizi ileterek 3D baskı ve CAD tasarım fizibilite analizi yaptırabilirsiniz.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="https://wa.me/905384843361?text=Merhaba,%20aracım%20için%20özel%203D%20parça%20tasarımı%20ve%20üretimi%20hakkında%20teknik%20bilgi%20ve%20fiyat%20almak%20istiyorum."
              target="_blank"
              rel="noreferrer"
              className="bg-[#FF5722] text-white hover:bg-white hover:text-black font-black italic uppercase text-xs md:text-sm tracking-widest px-8 py-5 transition-all duration-500 border border-[#FF5722] shadow-[0_0_15px_rgba(255,87,34,0.2)]"
            >
              WHATSAPP İLE PARÇA TASARLAT
            </a>
            <Link
              href="/iletisim"
              className="bg-transparent text-white hover:bg-white hover:text-black font-black italic uppercase text-xs md:text-sm tracking-widest px-8 py-5 transition-all duration-500 border border-white/20 hover:border-white"
            >
              İLETİŞİME GEÇ
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
