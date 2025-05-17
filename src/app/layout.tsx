import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import ClientCart from '@/components/layout/ClientCart';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SAUDA - Official Website",
  description: "Official website of SAUDA - Music, Tour Dates, and Merchandise",
  keywords: ["SAUDA", "music", "band", "tour dates", "merchandise", "official website"],
  authors: [{ name: "SAUDA" }],
  openGraph: {
    title: "SAUDA - Official Website",
    description: "Official website of SAUDA - Music, Tour Dates, and Merchandise",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/Testify-16-9.JPG",
        width: 1920,
        height: 1080,
        alt: "SAUDA Hero Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAUDA - Official Website",
    description: "Official website of SAUDA - Music, Tour Dates, and Merchandise",
    images: ["/Testify-16-9.JPG"],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Header />
          <div className="min-h-screen w-full bg-gradient-to-b from-[#0a1833] via-black to-[#0a1833]">
            {children}
            <Footer />
          </div>
          <ClientCart />
        </CartProvider>
      </body>
    </html>
  );
}
