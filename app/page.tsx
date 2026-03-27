import Link from "next/link";
import { ProductCard } from "./components/ProductCard";

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

const BRANDS = ["PROTRACK", "WIECHERS SPORT", "SPRINT BOOSTER", "MISHIMOTO", "EVENTURI"];

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
            className="object-cover w-full h-full opacity-70 scale-105 transition-transform duration-1000"
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
          <p className="mt-4 text-sm md:text-lg text-slate-400 font-light tracking-[0.3em] uppercase">
            Engineered for High-Performance
          </p>
          <a href="#featured" className="mt-12 py-5 px-12 border-2 border-white text-white font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            PARÇALARI KEŞFET
          </a>
        </div>
      </section>

      {/* Markalar Bölümü - Renklendirilmiş & Canlı */}
      <section id="brands" className="py-24 bg-zinc-900 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold tracking-[0.5em] text-white/40 uppercase">DÜNYACA ÜNLÜ MARKALARIMIZ</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-10 md:gap-20 items-center">
            {BRANDS.map((brand) => (
              <div key={brand} className="text-2xl md:text-4xl font-black tracking-tighter text-slate-500 hover:text-white hover:scale-110 transition-all duration-300 cursor-default">
                {brand}
              </div>
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
              <p className="text-slate-500 mt-2 font-medium">En Çok Tercih Edilen Performans Ürünleri</p>
            </div>
            <a href="#" className="text-sm font-bold tracking-widest text-white border-b border-white pb-1 hover:text-slate-400 hover:border-slate-400 transition-colors uppercase">
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

      {/* Projeler Bölümü */}
      <section id="projects" className="py-32 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-black tracking-tighter text-white uppercase italic mb-8">ATÖLYE PROJELERİ</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-12 text-xl font-light leading-relaxed">
            Pist ve cadde odaklı hazırladığımız, BMW ve VAG grubu özel projelerimizi detaylıca inceleyin.
          </p>
          <Link href="/projects" className="inline-block py-5 px-12 bg-white text-black font-black tracking-widest uppercase hover:bg-slate-300 transition-all duration-300">
            PROJELERİ GÖR
          </Link>
        </div>
      </section>

      {/* Footer / Alt Bilgi - WP Tarzı Modern Alt Kısım */}
      <footer className="py-20 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-black mb-6 italic">MC PERFORMANCE</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Yüksek performanslı otomotiv parçaları ve mühendislik çözümleri. BMW ve VAG grubu için aftermarket lideri.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold tracking-widest text-white mb-6 uppercase">Hızlı Linkler</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Ana Sayfa</a></li>
              <li><a href="#featured" className="hover:text-white transition-colors">Ürünler</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Projelerimiz</a></li>
              <li><a href="#" className="hover:text-white transition-colors">İletişim</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold tracking-widest text-white mb-6 uppercase">İletişim & Atölye</h4>
            <p className="text-slate-400 text-sm mb-2">Performans Atölyesi & Yedek Parça</p>
            <p className="text-white font-bold text-lg mb-4">info@mcperformance.com.tr</p>
            <div className="flex gap-4">
              {/* Buraya Instagram linkini ekleyebilirsin */}
              <span className="text-xs text-slate-600 uppercase">Antalya, Türkiye</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/5 text-center text-[10px] text-slate-700 tracking-[0.5em] uppercase">
          © 2026 MC Performance. Tüm Hakları Saklıdır.
        </div>
      </footer>
    </div>
  );
}