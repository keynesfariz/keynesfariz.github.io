import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Fariz Muhammad',
  description: 'Just another Software Engineer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn('font-sans', 'antialiased', inter.variable)}
      suppressHydrationWarning>
      <body className="bg-background text-foreground flex min-h-screen flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Header />
          <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 md:px-6 md:py-12 lg:px-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <GoogleAnalytics gaId={process.env.NEXT_GOOGLE_GA_ID ?? ''} />
      </body>
    </html>
  );
}
