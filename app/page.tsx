import Link from "next/link";
import { ProductCard } from "./components/ProductCard";

// 1. SATIŞINI YAPTIĞIN DEV MARKALAR
const BRANDS = [
  { name: "PROTRACK", slug: "protrack" },
  { name: "WIECHERS SPORT", slug: "wiechers" },
  { name: "SPRINT BOOSTER", slug: "sprint-booster" },
  { name: "MISHIMOTO", slug: "mishimoto" },
  { name: "EVENTURI", slug: "eventuri" },
  { name: "AEM", slug: "aem" },
  { name: "BOSCH", slug: "bosch" },
  { name: "MOTUL", slug: "motul" },
  { name: "ITALIAN RP", slug: "italian-rp" },
  { name: "ST SUSPENSIONS", slug: "st-suspensions" },
  { name: "BRAID", slug: "braid" }
];

const FEATURED_PRODUCTS = [
  {
    id: "an-fitting-90",
    name: "90° CNC AN Fitting - Siyah",
    price: 34.00,
    quantity: 1,
    image: "/images/product_fitting.png"
  },
  {
    id: "an-fitting-45",
    name: "45° CNC AN Fitting - Antrasit",
    price: 32.50,
    quantity: 1,
    image: "/images/product_fitting.png"
  },
  {
    id: "an-fitting-straight",
    name: "Düz CNC AN Fitting",
    price: 28.00,
    quantity: 1,
    image: "/images/product_fitting.png"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black z-10" />
          <img 
            src="/images/hero.png" 
            alt="MC Performance Atölye" 
            className="object-cover w-full h-full opacity-70"
          />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter text-white uppercase mb-6 drop-shadow-2xl">
            MC PERFORMANCE
          </h1>
          <div className="h-1 w-32 bg-white mb-8"></div>
          <p className="text-xl md:text-3xl text-slate-100 font-medium tracking-tight uppercase max-w-3xl">
            BMW & VAG Grubu Aftermarket Performans Çözümleri
          </p>
          <a href="#featured" className="mt-12 py-5 px-12 border-2 border-white text-white font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300">
            PARÇALARI KEŞFET
          </a>
        </div>
      </section>

      {/* Markalar Bölümü - Linkli ve Şık */}
      <section id="brands" className="py-20 bg-zinc-900 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-[10px] font-bold tracking-[0.6em] text-white/30 uppercase italic">SATIŞINI SAĞLADIĞIMIZ DÜNYA MARKALARI</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 items-center">
            {BRANDS.map((brand) => (
              <Link 
                key={brand.slug} 
                href={`/brands/${brand.slug}`}
                className="text-base md:text-lg font-black tracking-tighter text-slate-500 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer uppercase italic px-2"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Öne Çıkan Ürünler */}
      <section id="featured" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">POPÜLER PARÇALAR</h2>
              <div className="h-1 w-12 bg-white mt-2"></div>
            </div>
            <a href="#" className="text-sm font-bold tracking-widest text-white border-b border-white pb-1 hover:text-slate-400 transition-colors uppercase">
              TÜM KATALOĞU GÖR
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Projeler & Footer Bölümü Aynı Şekilde Kalacak... */}
      <section id="projects" className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-black tracking-tighter text-white uppercase italic mb-8">ATÖLYE PROJELERİ</h2>
          <Link href="/projects" className="inline-block py-5 px-12 bg-white text-black font-black tracking-widest uppercase hover:bg-slate-300 transition-all duration-300">
            PROJELERİ GÖR
          </Link>
        </div>
      </section>

      <footer className="py-20 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-black mb-6 italic text-white">MC PERFORMANCE</h3>
          <p className="text-slate-500 text-sm mb-8">Antalya, Türkiye | BMW & VAG Specialists</p>
          <p className="text-[10px] text-slate-700 tracking-[0.5em] uppercase italic">© 2026 MC Performance. Tüm Hakları Saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}