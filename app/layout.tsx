import { GoogleAnalytics } from '@next/third-parties/google';
import { Suspense, ViewTransition } from 'react';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BottomNav } from '@/components/layout/bottom-nav';
import { getMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';
import './globals.css';

const font = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export function generateMetadata() {
  return getMetadata();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn(font.variable, 'font-sans', 'antialiased', 'scroll-smooth')}
      suppressHydrationWarning>
      <body className="bg-background text-foreground flex min-h-screen flex-col">
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <Suspense>
              <ViewTransition>{children}</ViewTransition>
            </Suspense>
            <Footer />
            <BottomNav />
          </ThemeProvider>
        </QueryProvider>
      </body>
      {process.env.NEXT_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_GA_ID} />
      )}
    </html>
  );
}
