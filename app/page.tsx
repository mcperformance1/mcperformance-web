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
    <div className="flex flex-col w-full bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-10" />
          <img 
            src="/images/hero.png" 
            alt="MC Performance Shop" 
            className="object-cover w-full h-full opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none mb-4 italic">
            MC PERFORMANCE
          </h1>
          <p className="text-lg md:text-2xl font-mono tracking-widest text-slate-300 uppercase">
            BMW & VAG GRUBU AFTERMARKET PERFORMANS ÇÖZÜMLERİ
          </p>
          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
            <a href="#featured" className="py-4 px-12 bg-white text-black font-black hover:bg-zinc-200 transition-all uppercase italic">
              KATALOĞU İNCELE
            </a>
            <Link href="/projects" className="py-4 px-12 border border-white/20 hover:bg-white/10 transition-all uppercase font-bold italic">
              PROJELERİMİZ
            </Link>
          </div>
        </div>
      </section>

      {/* Markalar Bölümü */}
      <section className="py-16 bg-zinc-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-40 hover:opacity-100 transition-opacity duration-500">
            {BRANDS.map((brand) => (
              <Link 
                key={brand.slug} 
                href={`/brands/${brand.slug}`}
                className="text-xs md:text-sm font-black tracking-widest text-center hover:text-white transition-colors uppercase italic"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popüler Parçalar */}
      <section id="featured" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-baseline justify-between mb-12 border-b border-white/10 pb-6">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">Popüler Parçalar</h2>
            <Link href="/shop" className="text-xs font-bold tracking-[0.2em] text-zinc-500 hover:text-white transition-colors">TÜMÜNÜ GÖR // SHOP ALL</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Temiz Footer */}
      <footer className="py-20 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black italic mb-2">MC PERFORMANCE</h3>
            <p className="text-zinc-500 text-xs font-mono tracking-widest">BMW & VAG SPECIALISTS // ANTALYA</p>
          </div>
          <div className="flex gap-8 text-[10px] font-bold tracking-[0.3em] text-zinc-400 uppercase">
             <Link href="/contact" className="hover:text-white transition-colors">İLETİŞİM</Link>
             <Link href="/privacy" className="hover:text-white transition-colors">GİZLİLİK</Link>
             <Link href="/shipping" className="hover:text-white transition-colors">TESLİMAT</Link>
          </div>
        </div>
        <div className="text-center mt-16 text-[8px] text-zinc-800 tracking-[1em] uppercase">
          © 2026 MC PERFORMANCE - TÜM HAKLARI SAKLIDIR
        </div>
      </footer>
    </div>
  );
}