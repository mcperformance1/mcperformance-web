import React from "react";
import { fetchAllItems, NotionItem } from "../../../lib/notion";
import ProductSpecs from "../../../components/ProductSpecs";
import ProductGallery from "../../../components/ProductGallery";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Tüm ürünleri çekiyoruz
  const items = await fetchAllItems(); 
  
  // URL'den gelen slug ile sistemdeki ID'li slug'ı eşleştiriyoruz
  const product = items.find((item: NotionItem) => item.slug === slug);
  
  if (!product) {
    notFound(); 
  }

  const whatsappMessage = encodeURIComponent(`Merhaba, ${product.name} ürünü hakkında stok bilgisi almak ve sipariş vermek istiyorum.`);
  const whatsappUrl = `https://wa.me/905384843361?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-black text-white pt-40 px-6 max-w-screen-xl mx-auto flex flex-col pb-32">
       
       <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-20 mb-16 items-start">
           
           {/* Galeri Bileşeni: Ana resim ve Galeri dizisini gönderiyoruz */}
           <ProductGallery 
              mainImage={product.image} 
              galleryImages={product.images || []} 
           />

           {/* Sağ Panel: Info, Specs, WhatsApp */}
           <div className="w-full lg:flex-1 flex flex-col justify-start">
              <span className="text-gray-500 font-bold italic uppercase tracking-widest mb-3 inline-block text-[10px] md:text-xs">
                 Marka: <span className="text-[#FF5722]">{product.brand || "Bilinmiyor"}</span>
              </span>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black italic uppercase leading-tight mb-2 tracking-widest">
                {product.name}
              </h1>
              
              <p className="text-xl md:text-2xl font-medium italic text-gray-300 tracking-widest mb-6">
                {product.price}
              </p>
              
              {/* Teknik Özellikler Tablosu */}
              <ProductSpecs specs={product.specs} />
              
              <div className="mt-8">
                 <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-block bg-[#FF5722] text-white text-center font-bold italic uppercase text-xs md:text-sm px-10 py-5 hover:bg-white hover:text-black transition-all duration-500 rounded-lg shadow-[0_0_15px_rgba(255,87,34,0.2)] tracking-widest"
                 >
                    WHATSAPP'TAN BİLGİ ALIN
                 </a>
              </div>
           </div>
       </div>

       {/* Alt Panel: Açıklama */}
       {product.desc && (
         <div className="w-full bg-transparent p-6 md:p-10 border border-[#222222] rounded-2xl md:mt-10">
            <h3 className="text-sm md:text-base font-black italic uppercase mb-6 text-[#FF5722] border-b border-[#333] pb-4 inline-block tracking-[0.15em]">
               AÇIKLAMA & DETAYLAR
            </h3>
            <p className="text-gray-400 font-bold italic uppercase tracking-widest text-[10px] lg:text-[11px] leading-8 whitespace-pre-wrap">
              {product.desc}
            </p>
         </div>
       )}
    </div>
  )
}