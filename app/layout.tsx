import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ThemeProvider } from '@/components/theme-provider';
import { getMetadata } from '@/lib/data';
import { cn } from '@/lib/utils';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Inter } from 'next/font/google';
import { Suspense, ViewTransition } from 'react';
import './globals.css';

const font = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  preload: false,
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
      className={cn(font.variable, 'font-sans', 'antialiased')}
      suppressHydrationWarning>
      <body className="bg-background text-foreground flex min-h-screen flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="mx-auto w-full max-w-4xl flex-1 p-8 md:px-12 md:pt-12">
            <Suspense>
              <ViewTransition>{children}</ViewTransition>
            </Suspense>
          </main>
          <Footer />
        </ThemeProvider>
        <GoogleAnalytics gaId={process.env.NEXT_GA_ID ?? ''} />
      </body>
    </html>
  );
}
