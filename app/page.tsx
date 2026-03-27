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
    <div className="flex flex-col w-full bg-black text-white selection:bg-white selection:text-black">
      {/* Hero Section - Temiz ve Geniş */}
      <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="/images/hero.png" 
            alt="MC Performance" 
            className="object-cover w-full h-full opacity-60"
          />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-white uppercase mb-6">
            MC PERFORMANCE
          </h1>
          <div className="h-px w-24 bg-white/50 mb-8"></div>
          <p className="text-lg md:text-2xl text-slate-200 font-light tracking-widest uppercase">
            BMW & VAG GRUBU AFTERMARKET PERFORMANS PARÇALARI
          </p>
          <a href="#featured" className="mt-12 py-4 px-10 border border-white text-white font-medium tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500">
            KOLEKSİYONU KEŞFET
          </a>
        </div>
      </section>

      {/* Markalar - Sade ve Şık */}
      <section id="brands" className="py-24 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase italic">SATIŞINI SAĞLADIĞIMIZ MARKALAR</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-14 items-center opacity-60 hover:opacity-100 transition-opacity">
            {BRANDS.map((brand) => (
              <Link 
                key={brand.slug} 
                href={`/brands/${brand.slug}`}
                className="text-sm md:text-base font-bold tracking-widest text-white hover:scale-110 transition-transform cursor-pointer uppercase"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ürünler - Siyah Zemin Üzerinde */}
      <section id="featured" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-wider text-white uppercase mb-4 italic">ÖNE ÇIKAN PARÇALAR</h2>
              <div className="h-1 w-12 bg-white"></div>
            </div>
            <a href="#" className="hidden md:block text-xs font-medium tracking-widest text-slate-400 hover:text-white uppercase transition-colors">
              TÜMÜNÜ GÖR
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Eski Sade Haline Yakın */}
      <footer className="py-20 bg-black border-t border-white/10 text-center">
        <h3 className="text-2xl font-black mb-4 italic tracking-tighter">MC PERFORMANCE</h3>
        <p className="text-slate-500 text-xs font-light tracking-[0.3em] uppercase mb-8">BMW & VAG SPECIALISTS // ANTALYA</p>
        <div className="flex justify-center gap-6 text-[10px] font-bold text-slate-400 tracking-widest mb-12">
           <Link href="/contact" className="hover:text-white transition-colors">İLETİŞİM</Link>
           <Link href="/shipping" className="hover:text-white transition-colors">TESLİMAT</Link>
        </div>
        <div className="text-[8px] text-slate-800 tracking-[1em] uppercase">
          © 2026 MC PERFORMANCE
        </div>
      </footer>
    </div>
  );
}