import Link from "next/link";
import { ProductCard } from "./components/ProductCard";

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
    <div className="flex flex-col w-full bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* 1. HERO SECTION - TAM ORTALI (PC FIX) */}
      <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/70 z-10" />
          <img 
            src="/images/hero.png" 
            alt="MC Performance Hero" 
            className="object-cover w-full h-full opacity-60 transition-transform duration-[10s] hover:scale-110"
          />
        </div>
        
        <div className="relative z-20 px-4 max-w-5xl w-full flex flex-col items-center justify-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter text-white uppercase mb-6 leading-none">
            MC PERFORMANCE
          </h1>
          <div className="h-px w-32 bg-white/40 mb-8"></div>
          <p className="text-lg md:text-2xl text-slate-200 font-light tracking-[0.3em] uppercase max-w-2xl">
            BMW & VAG GRUBU AFTERMARKET PERFORMANS PARÇALARI
          </p>
          <a href="#featured" className="mt-12 py-5 px-12 border border-white text-white font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500 italic">
            PARÇALARI KEŞFET
          </a>
        </div>
      </section>

      {/* 2. MARKALAR - SONSUZ DÖNGÜ (INFINITE MARQUEE) */}
      <section className="py-12 bg-black border-y border-white/5 overflow-hidden relative group">
        <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
          {/* Markaları 3 kere yazıyoruz ki boşluk kalmasın */}
          {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, index) => (
            <Link 
              key={index} 
              href={`/brands/${brand.slug}`}
              className="text-2xl md:text-3xl font-black italic tracking-tighter text-zinc-700 hover:text-white transition-all mx-12 uppercase inline-block"
            >
              {brand.name}
            </Link>
          ))}
        </div>
      </section>

      {/* 3. ÖNE ÇIKAN PARÇALAR */}
      <section id="featured" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold tracking-wider text-white uppercase italic">ÖNE ÇIKAN PARÇALAR</h2>
              <div className="h-1 w-20 bg-white mx-auto md:mx-0 mt-4"></div>
            </div>
            <Link href="/shop" className="text-xs font-bold tracking-[0.3em] text-slate-500 hover:text-white uppercase border-b border-transparent hover:border-white pb-1 transition-all">
              TÜM KATALOĞU GÖR
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="py-24 bg-black border-t border-white/10 text-center">
        <h3 className="text-3xl font-black mb-4 italic tracking-tighter">MC PERFORMANCE</h3>
        <p className="text-slate-500 text-xs font-medium tracking-[0.5em] uppercase mb-12">BMW & VAG SPECIALISTS // ANTALYA</p>
        <div className="flex justify-center gap-10 text-[10px] font-bold text-slate-400 tracking-widest mb-16">
           <Link href="/contact" className="hover:text-white transition-colors uppercase">İLETİŞİM</Link>
           <Link href="/shipping" className="hover:text-white transition-colors uppercase">TESLİMAT</Link>
        </div>
        <div className="text-[10px] text-zinc-800 tracking-[1em] uppercase">
          © 2026 MC PERFORMANCE
        </div>
      </footer>
    </div>
  );
}