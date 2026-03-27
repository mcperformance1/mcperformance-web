import React from "react";
import { getItemBySlug } from "../../../lib/notion";
import ProductSpecs from "../../../components/ProductSpecs";

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const product = await getItemBySlug(params.slug);
  
  if (!product || product.category !== "Ürün") {
    return (
      <div className="min-h-screen bg-black pt-40 text-center text-gray-500 text-3xl font-black italic uppercase">
        Ürün bulunamadı veya veritabanında mevcut değil.
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(`Merhaba, ${product.name} ürünü hakkında stok bilgisi almak ve sipariş vermek istiyorum.`);
  const whatsappUrl = `https://wa.me/905384843361?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-black text-white pt-40 px-6 max-w-screen-xl mx-auto flex flex-col pb-32">
       
       <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-16">
           {/* Sol Panel: Görsel */}
           <div className="w-full lg:w-1/2 aspect-square bg-[#0A0A0A] border border-[#222222] relative overflow-hidden rounded-sm">
              <div 
                 className="w-full h-full bg-cover bg-center transition-transform hover:scale-105 duration-700" 
                 style={{ backgroundImage: `url(${product.image})` }} 
              />
           </div>

           {/* Sağ Panel: Info, Specs, WhatsApp */}
           <div className="w-full lg:w-1/2 flex flex-col justify-start">
              <span className="text-gray-500 font-black italic uppercase tracking-widest mb-4 inline-block">
                 Marka: <span className="text-white">{product.brand || "Bilinmiyor"}</span>
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black italic uppercase leading-none mb-6">
                {product.name}
              </h1>
              
              <p className="text-3xl font-black italic text-gray-300 tracking-wider">
                {product.price}
              </p>
              
              {/* Dinamik Özellikler Tablosu */}
              <ProductSpecs specs={product.specs} />
              
              <div className="mt-auto pt-8">
                 <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="block bg-[#25D366] text-black text-center font-black italic uppercase text-lg px-6 py-5 hover:bg-[#20bd5a] transition-colors w-full shadow-lg hover:shadow-xl"
                 >
                    WHATSAPP İLE BİLGİ AL
                 </a>
              </div>
           </div>
       </div>

       {/* Alt Panel: Açıklama Metni */}
       {product.desc && (
         <div className="w-full bg-[#0a0a0a] p-8 md:p-12 border-l-4 border-white">
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
