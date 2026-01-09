import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/hooks/useAuth';
import { Layout } from '@/components/layout/Layout';
import { Providers } from '@/components/Providers';
import Script from 'next/script';

// Optimize font loading with display swap
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

// Viewport configuration for better mobile experience
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2D6E7A' },
    { media: '(prefers-color-scheme: dark)', color: '#1a4a54' },
  ],
};

// Enhanced metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://ramadangiving.github.io'),
  title: {
    default: 'Ramadan Giving - Building Bridges of Hope',
    template: '%s | Ramadan Giving',
  },
  description: 'Join us in making a difference. Ramadan Giving provides food, winter kits, and programs to vulnerable families in Toronto and Cairo. Since 2021, we\'ve raised $320K+ and served thousands of families.',
  keywords: ['Ramadan', 'charity', 'giving', 'humanitarian', 'food relief', 'Toronto', 'Cairo', 'Muslim charity', 'winter kits', 'community support', 'donation', 'volunteer'],
  authors: [{ name: 'Ramadan Giving Team' }],
  creator: 'Ramadan Giving',
  publisher: 'Ramadan Giving',
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    title: 'Ramadan Giving - Building Bridges of Hope',
    description: 'Join us in making a difference. Ramadan Giving provides food, winter kits, and programs to vulnerable families in Toronto and Cairo.',
    url: 'https://ramadangiving.github.io',
    siteName: 'Ramadan Giving',
    images: [
      {
        url: '/assets/images/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Ramadan Giving - Building Bridges of Hope',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ramadan Giving - Building Bridges of Hope',
    description: 'Join us in making a difference. Food relief, winter kits, and programs for vulnerable families.',
    images: ['/assets/images/logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://ramadangiving.github.io',
  },
  icons: {
    icon: [
      { url: '/assets/images/logo.jpg', sizes: 'any' },
      { url: '/assets/images/logo.jpg', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/assets/images/logo.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
    shortcut: '/assets/images/logo.jpg',
  },
};

// JSON-LD structured data for better SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NonProfitOrganization',
  name: 'Ramadan Giving',
  description: 'Community-driven charity providing food relief, winter kits, and programs to vulnerable families in Toronto and Cairo.',
  url: 'https://ramadangiving.github.io',
  logo: 'https://ramadangiving.github.io/assets/images/logo.jpg',
  foundingDate: '2021',
  areaServed: [
    { '@type': 'City', name: 'Toronto', containedInPlace: { '@type': 'Country', name: 'Canada' } },
    { '@type': 'City', name: 'Cairo', containedInPlace: { '@type': 'Country', name: 'Egypt' } },
  ],
  knowsAbout: ['Food Relief', 'Winter Assistance', 'Community Programs', 'Humanitarian Aid'],
  sameAs: [
    'https://instagram.com/ramadangiving',
    // Add other social links
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/assets/images/logo.jpg" type="image/jpeg" sizes="any" />
        <link rel="shortcut icon" href="/assets/images/logo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/assets/images/logo.jpg" sizes="180x180" />
        
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://cdn.amcharts.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.amcharts.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <ThemeProvider>
            <AuthProvider>
              <Layout>
                {children}
              </Layout>
            </AuthProvider>
          </ThemeProvider>
        </Providers>
        
        {/* Load amCharts lazily - only needed for the map section */}
        <Script 
          src="https://cdn.amcharts.com/lib/5/index.js"
          strategy="lazyOnload"
        />
        <Script 
          src="https://cdn.amcharts.com/lib/5/map.js"
          strategy="lazyOnload"
        />
        <Script 
          src="https://cdn.amcharts.com/lib/5/geodata/worldLow.js"
          strategy="lazyOnload"
        />
        <Script 
          src="https://cdn.amcharts.com/lib/5/themes/Animated.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
