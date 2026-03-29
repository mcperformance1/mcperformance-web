import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import Notification from "../components/Notification";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// --- SEO VE MARKA MÜHİMMATI ---
export const metadata: Metadata = {
  metadataBase: new URL('https://mcperformance.com.tr'),
  title: {
    default: "MC PERFORMANCE | High-Performance Tuning & Parts",
    template: "%s | MC PERFORMANCE"
  },
  description: "BMW ve VAG grubu araçlar için profesyonel performans çözümleri. Protrack wheels, coilover kitleri, fren sistemleri ve kule gergileri. Track-Focused Premium Tuning.",
  keywords: [
    "MC Performance", "BMW Tuning", "VAG Performance", "Protrack One Türkiye", 
    "Coilover Kiti", "Fren Hortumu", "Kule Gergisi", "Performance Parts Istanbul",
    "Track Focused Parts", "ST Spacer", "AEM Performance"
  ],
  authors: [{ name: "MC Performance" }],
  creator: "MC Performance",
  publisher: "MC Performance",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // --- SEKMELERE TABELAYI (ICON) ASIYORUZ ---
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: [
      { url: "/icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  // ------------------------------------------
  openGraph: {
    title: "MC PERFORMANCE | High-Performance Tuning",
    description: "Track-Focused Premium Otomotiv Parçaları Kataloğu",
    url: "https://mcperformance.com.tr",
    siteName: "MC Performance",
    images: [
      {
        url: '/icon.png', 
        width: 800,
        height: 800,
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${interFont.variable} font-sans scroll-smooth`}>
      <body className="bg-[#000000] text-white min-h-screen flex flex-col selection:bg-[#FF5722] selection:text-white font-black italic tracking-widest uppercase antialiased">
        <CartProvider>
          <Notification />
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}