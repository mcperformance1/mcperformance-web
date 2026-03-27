import React from "react";

export default function ProductSpecs({ specs }: { specs: Record<string, string> }) {
  const entries = Object.entries(specs || {});
  
  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="w-full mt-8 mb-8 border-t border-[#222222]">
      {entries.map(([key, value]) => (
        <div key={key} className="flex justify-between items-center py-4 border-b border-[#222222] hover:bg-[#0a0a0a] transition-colors px-2">
          <span className="text-gray-400 font-black italic uppercase text-sm md:text-base tracking-wider">
            {key}
          </span>
          <span className="text-white font-black italic uppercase text-sm md:text-base text-right max-w-[50%]">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
