"use client";
import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: string;
  name: string;
  slug: string;
  category: string;
}

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const fetchResults = async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      }
    };
    const timer = setTimeout(fetchResults, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (item: SearchResult) => {
    // Kategoriye göre doğru yola git
    const path = item.category === "Proje" ? `/projeler/${item.slug}` : `/product/${item.slug}`;
    router.push(path);
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      handleSelect(results[0]);
    } else if (query.trim()) {
      router.push(`/magaza?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative flex items-center h-full">
      {isOpen ? (
        <div className="relative">
          <form 
            onSubmit={handleSearch} 
            className="flex items-center bg-[#111111] rounded border border-[#333333] px-3 py-1.5 transition-all w-48 md:w-64"
          >
            <input 
              type="text" 
              autoFocus 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ürün veya marka ara..." 
              className="bg-transparent text-white outline-none w-full italic font-medium text-sm placeholder-gray-500"
            />
            <button 
              type="button" 
              onClick={() => {
                setIsOpen(false);
                setQuery("");
                setResults([]);
              }} 
              className="ml-2 text-gray-500 hover:text-white transition-colors"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </form>

          {/* Canlı Arama Sonuçları Dropdown */}
          {results.length > 0 && (
            <div className="absolute top-full left-0 mt-2 w-full bg-[#0A0A0A] border border-[#222222] shadow-2xl z-50 rounded overflow-hidden">
              {results.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="px-4 py-3 hover:bg-[#1A1A1A] cursor-pointer border-b border-[#111111] last:border-0"
                >
                  <p className="text-white text-sm font-bold italic truncate">{item.name}</p>
                  <p className="text-gray-500 text-[10px] font-black italic uppercase mt-1">{item.category || "ÜRÜN"}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)} 
          className="text-white hover:text-gray-400 transition-colors flex items-center justify-center p-1"
        >
          <Search size={22} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
