import React from "react";
import { getItemBySlug } from "../../../lib/notion";

export default async function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = await getItemBySlug(params.slug);
  
  if (!project || project.category !== "Proje") {
    return (
      <div className="min-h-screen bg-black pt-40 text-center text-gray-500 text-3xl font-black italic uppercase">
        Proje bulunamadı veya veritabanında mevcut değil.
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(`Merhaba, "${project.name}" projesi hakkında teknik destek veya kendi aracım için benzer bir mühendislik çalışması bilgisi almak istiyorum.`);
  const whatsappUrl = `https://wa.me/905384843361?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-black text-white pt-40 px-6 max-w-screen-xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-16 pb-32">
       
       <div className="w-full md:w-1/2 aspect-video md:aspect-[4/3] bg-[#0A0A0A] border border-[#222222] relative overflow-hidden rounded-sm">
          <div 
             className="w-full h-full bg-cover bg-center transition-transform hover:scale-105 duration-700" 
             style={{ backgroundImage: `url(${project.image})` }} 
          />
       </div>

       <div className="w-full md:w-1/2 flex flex-col justify-center">
          <span className="text-gray-500 font-bold italic uppercase tracking-widest mb-4 inline-block">
             PROJE ÖZETİ
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black italic uppercase leading-none mb-6">
            {project.name}
          </h1>
          
          <div className="bg-[#111111] p-6 border-l-4 border-white mb-10 mt-4">
            <h3 className="text-xl font-bold italic uppercase mb-2 text-white border-b border-[#333333] pb-4">AÇIKLAMA VE TEKNİK YAPILANDIRMA</h3>
            <p className="text-gray-400 font-medium leading-relaxed mt-4 whitespace-pre-wrap">
              {project.desc || "Bu proje için henüz bir açıklama girilmemiş."}
            </p>
          </div>
          
          <a 
             href={whatsappUrl} 
             target="_blank" 
             rel="noreferrer" 
             className="bg-[#25D366] text-black text-center font-black italic uppercase text-lg p-5 hover:bg-[#20bd5a] transition-colors w-full lg:w-[80%] shadow-lg hover:shadow-xl mt-auto"
          >
             WHATSAPP İLE BİLGİ AL
          </a>
       </div>

    </div>
  )
}
