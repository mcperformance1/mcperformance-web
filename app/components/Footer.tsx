export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between text-center md:text-left">
          <div className="flex justify-center md:justify-start mb-6 md:mb-0">
            <span className="text-xl font-bold tracking-widest text-white">MC PERFORMANCE</span>
          </div>
          <div className="grid grid-cols-2 gap-8 md:flex md:space-x-12 mb-6 md:mb-0 text-sm">
            <div>
              <h3 className="text-white font-medium mb-3 tracking-wider">NAVIGATION</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
                <li><a href="#brands" className="hover:text-white transition-colors">Brands</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-3 tracking-wider">CONTACT</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="https://wa.me/905384843361" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp Inquiry</a></li>
                <li>Istanbul, Turkey</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} MC Performance. Engineered for Excellence.
          </p>
          <p className="text-xs text-slate-600">
            BMW & VAG Specialists
          </p>
        </div>
      </div>
    </footer>
  );
}
