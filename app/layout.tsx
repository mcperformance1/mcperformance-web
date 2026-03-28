import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MC Performance | Otomotiv Performans & Mühendislik",
  description: "Track-Focused Premium Otomotiv Parçaları Kataloğu",
};

import { CartProvider } from "../context/CartContext";
import Notification from "../components/Notification";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${interFont.variable} font-sans`}>
      <body className="bg-[#000000] text-white min-h-screen flex flex-col selection:bg-white selection:text-black font-black italic">
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
