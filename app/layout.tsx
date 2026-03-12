import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ThemeProvider } from '@/components/theme-provider';
import { getPageTitle } from '@/lib/data';
import { cn } from '@/lib/utils';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export function generateMetadata() {
  return {
    title: getPageTitle(),
    description: 'Just another Software Engineer',
  };
}

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
          <main className="mx-auto w-full max-w-4xl flex-1 p-8 md:px-12 md:pt-12">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <GoogleAnalytics gaId={process.env.NEXT_GA_ID ?? ''} />
      </body>
    </html>
  );
}
