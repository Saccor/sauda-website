import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import ClientCart from '@/components/layout/ClientCart';
import { FlyToCartProvider } from '@/components/ui/FlyToCartProvider';
import { FloatingSocialButton } from '@/components/social-media/FloatingSocialButton';

const nordMedium = localFont({
  src: '../../public/fonts/Nord-Medium.ttf',
  variable: '--font-nord',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: 'Arial',
  weight: '500',
  style: 'normal',
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
    <html lang="en" className={`${nordMedium.variable} antialiased`}>
      <head>
        <link
          rel="preload"
          href="/fonts/Nord-Medium.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-gradient-to-b from-[#0a1833] via-black to-[#0a1833]">
        <FlyToCartProvider>
          <CartProvider>
            <ClientCart />
            <Header />
            <div className="min-h-screen w-full overflow-x-hidden">
              {children}
              <Footer />
              <FloatingSocialButton />
            </div>
          </CartProvider>
        </FlyToCartProvider>
      </body>
    </html>
  );
}
