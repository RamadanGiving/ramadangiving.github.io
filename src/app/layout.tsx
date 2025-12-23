import type { Metadata } from 'next';
import { DM_Sans, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';
import Script from 'next/script';

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
});

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  title: 'Ramadan Giving - Building Bridges of Hope',
  description: 'Join us in making a difference. Ramadan Giving provides food, winter kits, and programs to vulnerable families in Toronto and Cairo.',
  keywords: ['Ramadan', 'charity', 'giving', 'humanitarian', 'food relief', 'Toronto', 'Cairo'],
  openGraph: {
    title: 'Ramadan Giving - Building Bridges of Hope',
    description: 'Join us in making a difference. Ramadan Giving provides food, winter kits, and programs to vulnerable families.',
    url: 'https://ramadangiving.github.io',
    siteName: 'Ramadan Giving',
    images: [
      {
        url: '/assets/images/logo.jpg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* amCharts Scripts */}
        <Script 
          src="https://cdn.amcharts.com/lib/5/index.js"
          strategy="beforeInteractive"
        />
        <Script 
          src="https://cdn.amcharts.com/lib/5/map.js"
          strategy="beforeInteractive"
        />
        <Script 
          src="https://cdn.amcharts.com/lib/5/geodata/worldLow.js"
          strategy="beforeInteractive"
        />
        <Script 
          src="https://cdn.amcharts.com/lib/5/themes/Animated.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${dmSans.variable} ${cormorant.variable}`}>
        <ParticlesBackground />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
