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
      className={cn('mx-auto w-full max-w-4xl grow p-8 md:p-12', className)}>
      {children}
    </main>
  );
}
