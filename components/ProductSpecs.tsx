import React from "react";

export default function ProductSpecs({ specs }: { specs: Record<string, string> }) {
  const entries = Object.entries(specs || {});
  
  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="w-full mt-6 mb-8 border-t border-[#333333]">
      {entries.map(([key, value]) => (
        <div key={key} className="flex justify-between items-start py-3 border-b border-[#333333] hover:bg-[#111111] transition-colors pr-2">
           <span className="text-gray-500 font-medium tracking-wide text-xs uppercase pt-1">
             {key}
           </span>
           <span className="text-white font-black italic uppercase text-sm text-right pl-4">
             {value}
           </span>
        </div>
      ))}
    </div>
  );
}
