import Link from "next/link";
import { ProductCard } from "./components/ProductCard";

const FEATURED_PRODUCTS = [
  {
    id: "an-fitting-90",
    name: "90° CNC AN Fitting - Black",
    price: 34.00,
    quantity: 1,
    image: "/images/product_fitting.png"
  },
  {
    id: "an-fitting-45",
    name: "45° CNC AN Fitting - Slate",
    price: 32.50,
    quantity: 1,
    image: "/images/product_fitting.png"
  },
  {
    id: "an-fitting-straight",
    name: "Straight CNC AN Fitting",
    price: 28.00,
    quantity: 1,
    image: "/images/product_fitting.png"
  }
];

const BRANDS = ["PROTRACK", "WIECHERS SPORT", "SPRINT BOOSTER", "MISHIMOTO", "EVENTURI"];

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img 
            src="/images/hero.png" 
            alt="MC Performance Engine Bay" 
            className="object-cover w-full h-full opacity-60"
          />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-white uppercase mb-6 drop-shadow-lg">
            MC PERFORMANCE
          </h1>
          <div className="h-px w-24 bg-white/50 mb-8"></div>
          <p className="text-lg md:text-2xl text-slate-200 font-light tracking-widest uppercase">
            Engineered for Excellence. BMW & VAG Specialists.
          </p>
          <a href="#featured" className="mt-12 py-4 px-10 border border-white text-white font-medium tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500">
            Explore Collection
          </a>
        </div>
      </section>

      {/* Brand Wall Section */}
      <section id="brands" className="py-24 border-b border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase">Trusted Partners</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center opacity-70">
            {BRANDS.map((brand) => (
              <div key={brand} className="text-xl md:text-3xl font-bold tracking-widest text-white hover:opacity-100 transition-opacity cursor-pointer grayscale hover:grayscale-0">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-wider text-white uppercase mb-4">Featured Collection</h2>
              <div className="h-1 w-12 bg-white"></div>
            </div>
            <a href="#" className="hidden md:block text-sm font-medium tracking-widest text-slate-400 hover:text-white uppercase transition-colors">
              View All Parts
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <a href="#" className="text-sm font-medium tracking-widest text-slate-400 hover:text-white uppercase transition-colors">
              View All Parts
            </a>
          </div>
        </div>
      </section>

      {/* Projects Teaser Section */}
      <section id="projects" className="py-32 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold tracking-wider text-white uppercase mb-6">Our Builds</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-lg">
            Discover our portfolio of high-performance track weapons and fast-road perfection. Meticulously assembled in-house.
          </p>
          <Link href="/projects" className="inline-block py-4 px-10 bg-white text-black font-semibold tracking-widest uppercase hover:bg-slate-200 transition-colors duration-300">
            View Projects
          </Link>
        </div>
      </section>
    </div>
  );
}