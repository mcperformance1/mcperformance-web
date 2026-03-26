export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Logo Alanı */}
        <h1 className="text-6xl font-extrabold tracking-tighter uppercase italic">
          MC Performance
        </h1>
        
        <p className="text-xl text-gray-400 font-light tracking-wide uppercase">
          BMW & VAG Specialist | High Performance Parts
        </p>

        {/* Ana Kategoriler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {["Hardware", "Software", "Track Prep"].map((item) => (
            <div key={item} className="border border-white/20 p-8 hover:bg-white hover:text-black transition-all cursor-pointer group">
              <h2 className="text-2xl font-bold uppercase tracking-tight">{item}</h2>
            </div>
          ))}
        </div>

        <div className="pt-12">
          <p className="text-sm text-gray-500 uppercase tracking-widest">
            Site is under construction. Fasten your seatbelts.
          </p>
        </div>
      </div>
    </main>
  );
}