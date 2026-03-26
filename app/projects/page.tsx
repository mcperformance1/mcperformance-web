"use client";

import { useState } from "react";
import Link from "next/link";
import { PROJECTS } from "../data/projects";

type FilterType = "ALL" | "BMW" | "VAG";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<FilterType>("ALL");

  const filteredProjects = PROJECTS.filter((p) => filter === "ALL" || p.brand === filter);

  return (
    <div className="flex flex-col min-h-screen bg-black pt-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full mt-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-white uppercase mb-4 drop-shadow-md">Our Projects</h1>
        <div className="h-px w-24 bg-white/30 mx-auto mb-8"></div>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Masterpieces of engineering. A curated selection of track weapons and fast-road builds from the MC Performance garage. 
        </p>
      </div>

      {/* Filter Bar */}
      <div className="border-y border-white/10 bg-zinc-950 py-6 mb-16 shadow-inner relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center space-x-12">
          {(["ALL", "BMW", "VAG"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-sm md:text-base font-bold tracking-[0.2em] uppercase transition-all duration-300 pb-2 border-b-2 ${
                filter === f ? "text-white border-white opacity-100" : "text-slate-500 border-transparent hover:text-slate-300 opacity-60 hover:opacity-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 w-full">
        {filteredProjects.length === 0 ? (
          <div className="text-center text-slate-500 py-12">No projects found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {filteredProjects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900 border border-white/10 mb-6 shadow-lg group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-shadow duration-500">
                  <img 
                    src={project.coverImage} 
                    alt={project.title} 
                    className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs font-bold text-white tracking-widest uppercase">
                    {project.brand}
                  </div>
                </div>
                <h2 className="text-2xl font-bold tracking-wider text-white mb-3 group-hover:text-slate-300 transition-colors duration-300">
                  {project.title}
                </h2>
                <div className="h-px w-12 bg-white/20 mb-4 group-hover:w-full transition-all duration-500 ease-in-out"></div>
                <p className="text-slate-400 line-clamp-2 leading-relaxed font-light">
                  {project.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
