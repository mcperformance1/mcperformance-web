import React from "react";
import { fetchAllItems, NotionItem } from "../../../lib/notion";
import ProductSpecs from "../../../components/ProductSpecs";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const items = await fetchAllItems(); // Explicitly fetch all instead of using wrapper
  const product = items.find((item: NotionItem) => item.slug === slug);
  
  if (!product) {
    const availableSlugs = items.map((i: NotionItem) => i.slug).join(", ");
    return (
      <div className="min-h-screen bg-black pt-40 px-6 max-w-screen-xl mx-auto flex flex-col pb-32">
        <div className="text-center text-gray-500 font-black italic uppercase">
           <h2 className="text-4xl mb-4">Ürün Bulunamadı</h2>
           <p className="text-xl mb-4 text-red-500">Aranan: {slug}</p>
           <p className="text-sm font-medium text-gray-400 break-words">Sistemdeki Sluglar: {availableSlugs || "Sistemde hiç ürün yok. Vercel env değişkenlerini kontrol edin."}</p>
        </div>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(`Merhaba, ${product.name} ürünü hakkında stok bilgisi almak ve sipariş vermek istiyorum.`);
  const whatsappUrl = `https://wa.me/905384843361?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-black text-white pt-40 px-6 max-w-screen-xl mx-auto flex flex-col pb-32">
       
       <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-20 mb-16 items-start">
           {/* Sol Panel: Görsel & Galeri */}
           <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col gap-4">
              {/* Ana Görsel */}
              <div className="w-full aspect-square bg-[#0A0A0A] border border-[#FF5722] hover:border-transparent transition-colors duration-500 relative overflow-hidden rounded-xl shadow-2xl group">
                 <div 
                    className="w-full h-full bg-cover bg-center transition-transform hover:scale-105 duration-700" 
                    style={{ backgroundImage: `url(${product.image})` }} 
                 />
                 {/* İnteraktif Çerçeve Hover İpuçları (Opsiyonel) */}
                 <div className="absolute inset-0 border border-transparent group-hover:border-white/50 transition-colors duration-500 rounded-xl pointer-events-none" />
              </div>

              {/* Küçük Galeri (Mocked for Alpinestar Style) */}
              <div className="flex gap-3 w-full overflow-x-auto pb-2 scrollbar-none">
                 {[product.image, product.image, product.image, product.image].map((imgUrl, idx) => (
                    <div 
                      key={idx} 
                      className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 border border-[#222] hover:border-[#FF5722] transition-colors duration-300 rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100 bg-[#0A0A0A]"
                    >
                      <div 
                         className="w-full h-full bg-cover bg-center" 
                         style={{ backgroundImage: `url(${imgUrl})` }} 
                      />
                    </div>
                 ))}
              </div>
           </div>

           {/* Sağ Panel: Info, Specs, WhatsApp */}
           <div className="w-full lg:flex-1 flex flex-col justify-start">
              <span className="text-gray-500 font-bold italic uppercase tracking-widest mb-3 inline-block text-xs md:text-sm">
                 Marka: <span className="text-white">{product.brand || "Bilinmiyor"}</span>
              </span>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black italic uppercase leading-tight mb-2">
                {product.name}
              </h1>
              
              <p className="text-xl md:text-2xl font-medium italic text-gray-300 tracking-widest mb-2">
                {product.price}
              </p>
              
              {/* Dinamik Özellikler Tablosu */}
              <ProductSpecs specs={product.specs} />
              
              <div className="mt-8">
                 <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-block bg-[#FF5722] text-white text-center font-bold italic uppercase text-sm md:text-base px-10 py-4 hover:bg-white hover:text-black transition-all duration-500 rounded-full shadow-[0_0_15px_rgba(255,87,34,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] tracking-widest"
                 >
                    WHATSAPP'TAN BİLGİ ALIN
                 </a>
              </div>
           </div>
       </div>

       {/* Alt Panel: Açıklama Metni */}
       {product.desc && (
         <div className="w-full bg-[#0a0a0a] p-6 md:p-10 border border-[#222222] rounded-2xl">
            <h3 className="text-2xl font-black italic uppercase mb-6 text-white border-b border-[#333] pb-4 inline-block">
               Açıklama & Detaylar
            </h3>
            <p className="text-gray-400 font-black italic text-lg leading-relaxed whitespace-pre-wrap">
              {product.desc}
            </p>
         </div>
       )}

    </div>
  )
}
