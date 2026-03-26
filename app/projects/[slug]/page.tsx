import { notFound } from "next/navigation";
import { PROJECTS } from "../../data/projects";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// In Next.js App Router (15+), params is a promise.
export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-black pt-20 w-full">
      {/* Hero Header */}
      <section className="relative w-full h-[60vh] min-h-[500px] border-b border-white/10">
        <img 
          src={project.coverImage} 
          alt={project.title} 
          className="object-cover w-full h-full opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="text-center relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase drop-shadow-xl mb-6">
              {project.title}
            </h1>
            <div className="flex items-center justify-center space-x-6 text-sm font-bold tracking-widest text-white uppercase">
              <span className="border border-white/30 px-4 py-1">{project.brand}</span>
              <span className="text-slate-300">MC.P BUILD</span>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Layout: Specs & Description */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Link href="/projects" className="inline-flex items-center text-sm font-semibold tracking-widest text-white uppercase hover:text-slate-400 transition-colors mb-12">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Projects
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold tracking-widest text-white uppercase mb-6">The Build Philosophy</h2>
              <div className="h-px w-16 bg-white mb-6"></div>
              <p className="text-slate-300 leading-loose text-lg font-light">
                {project.description}
              </p>
            </div>
            
            <div className="bg-zinc-950 border border-white/10 p-8 shadow-2xl">
              <h3 className="text-lg font-bold tracking-widest text-white uppercase mb-8">Technical Specs</h3>
              <dl className="space-y-6">
                <div>
                  <dt className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">Engine</dt>
                  <dd className="text-white text-lg font-mono">{project.specs.engine}</dd>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <dt className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">Power Output</dt>
                  <dd className="text-white text-lg font-mono">{project.specs.power}</dd>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <dt className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">Suspension</dt>
                  <dd className="text-white text-lg font-mono">{project.specs.suspension}</dd>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <dt className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">Wheels & Stance</dt>
                  <dd className="text-white text-lg font-mono">{project.specs.wheels}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-zinc-950 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-widest text-white uppercase mb-12 text-center">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.gallery.map((imgUrl, i) => (
              <div key={i} className="aspect-square relative overflow-hidden bg-zinc-900 border border-white/5 group">
                <img 
                  src={imgUrl} 
                  alt={`${project.title} gallery view ${i + 1}`} 
                  className="object-cover w-full h-full grayscale-[50%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
