import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
  (process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : 'https://jackmorgan-rlp.com'); // Replace with your production domain

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Jack Morgan RLP - Comedy, Skateboarding & Business',
  description: 'Join Jack Morgan RLP\'s world of comedy, skateboarding, and business insights. Watch latest content and join the community.',
  openGraph: {
    title: 'Jack Morgan RLP',
    description: 'Comedy. Skateboarding. Business.',
    images: [{
      url: '/assets/brand/og-image.jpg',
    }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CartProvider>
              <Navigation />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <Toaster richColors position="top-center" />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}