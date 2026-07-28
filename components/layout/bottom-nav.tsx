'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { useScrollDirection } from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';

const links = [
  { label: 'About', path: '/about' },
  { label: 'History', path: '/resume' },
  { label: 'Writings', path: '/writings' },
];

export function BottomNav() {
  const pathname = usePathname();
  const { isScrollingDown, isAtBottom } = useScrollDirection();

  return (
    <div
      className={cn(
        'fixed inset-x-0 z-50 flex items-center justify-center transition-all duration-300 ease-in-out md:hidden',
        // If at bottom, translate it down to hide it so it doesn't overlap footer
        isAtBottom ? 'bottom-26' : 'bottom-6',
        // When scrolling down, shrink the container
        isScrollingDown ? 'scale-95' : 'scale-100',
      )}>
      <nav
        className={cn(
          'bg-background flex items-center gap-1 rounded-full border backdrop-blur-md transition-all duration-300 ease-in-out',
          isAtBottom ? 'shadow-sm' : 'shadow-xl',
          isScrollingDown ? 'p-1' : 'px-3 py-2.5',
        )}>
        {links.map((link) => {
          const isActive = pathname.startsWith(link.path);
          return (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                buttonVariants({
                  variant: isActive ? 'secondary' : 'ghost',
                  size: 'sm',
                }),
                'rounded-full transition-all duration-300 ease-in-out',
              )}>
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
