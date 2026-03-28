import React from "react";

export default function ProductSpecs({ specs }: { specs: Record<string, string> }) {
  const entries = Object.entries(specs || {});
  
  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="w-full mt-6 mb-8 border-t border-[#333333]">
      {entries.map(([key, value]) => (
        <div key={key} className="flex justify-between items-start py-3 border-b border-[#222222] hover:bg-[#0A0A0A] transition-colors pr-2 group">
           <span className="text-gray-600 font-bold italic tracking-widest text-[9px] md:text-[10px] uppercase pt-1 group-hover:text-gray-400 transition-colors">
             {key}
           </span>
           <span className="text-gray-300 font-bold italic uppercase tracking-widest text-[10px] md:text-[11px] text-right pl-4">
             {value}
           </span>
        </div>
      ))}
    </div>
  );
}
