import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function MainLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        'mx-auto w-full max-w-4xl flex-1 p-8 md:px-12 md:pt-12',
        className,
      )}>
      {children}
    </main>
  );
}
