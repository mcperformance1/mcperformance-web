import Image from "next/image";
import Link from "next/link"; // Bu çok önemli kanka!

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    slug: string; // Notion'dan gelen slug
  };
}

export function ProductCard({ product }: ProductProps) {
  return (
    // Kartın tamamını Link ile sarıyoruz ki her yerinden tıklansın
    <Link href={`/product/${product.slug}`} className="group">
      <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl cursor-pointer hover:border-orange-600 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(234,88,12,0.2)]">
        
        {/* Ürün Resmi */}
        <div className="relative aspect-square mb-6 overflow-hidden rounded-xl bg-black/50">
          <Image
            src={product.image || "/images/no-image.png"}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Ürün Adı ve Fiyatı */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold uppercase tracking-tighter text-zinc-300 group-hover:text-white transition-colors">
            {product.name}
          </h3>
          <div className="flex justify-between items-end">
            <p className="text-2xl font-black text-orange-500">
              {product.price.toLocaleString('tr-TR')} <span className="text-sm font-normal text-zinc-500 uppercase font-light">TL</span>
            </p>
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest border border-zinc-800 px-2 py-1 rounded group-hover:border-orange-600 group-hover:text-orange-500 transition-all">
              İncele
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}