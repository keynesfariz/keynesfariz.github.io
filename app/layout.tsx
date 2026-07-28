import { GoogleAnalytics } from '@next/third-parties/google';
import { Suspense, ViewTransition } from 'react';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
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
  sidebar,
  leftSidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
  leftSidebar: React.ReactNode;
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
            <Header
              mobileRightSidebar={sidebar}
              mobileLeftSidebar={leftSidebar}
            />
            <Suspense>
              <ViewTransition>
                <LayoutWithSidebar leftSidebar={leftSidebar} sidebar={sidebar}>
                  {children}
                </LayoutWithSidebar>
              </ViewTransition>
            </Suspense>
            <Footer />
          </ThemeProvider>
        </QueryProvider>
      </body>
      {process.env.NEXT_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_GA_ID} />
      )}
    </html>
  );
}

function LayoutWithSidebar({
  children,
  sidebar,
  leftSidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
  leftSidebar: React.ReactNode;
}>) {
  return (
    <div className="flex w-full">
      {leftSidebar && (
        <aside className="bg fixed top-0 bottom-0 left-0 z-10 hidden w-60 flex-col overflow-y-auto pt-30 pr-3 pb-8 pl-6 xl:flex">
          {leftSidebar}
        </aside>
      )}
      <div className="grow">{children}</div>
      {sidebar && (
        <aside className="bg fixed top-0 right-0 bottom-0 z-10 hidden w-60 flex-col overflow-y-auto pt-30 pr-6 pb-8 pl-3 xl:flex">
          {sidebar}
        </aside>
      )}
    </div>
  );
}
