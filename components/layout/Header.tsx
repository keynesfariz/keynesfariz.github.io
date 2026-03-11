'use client';

import Logo from '@/components/Logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLink = {
  label: string;
  path: string;
  exact?: boolean;
};

const links: NavLink[] = [
  {
    label: 'About',
    path: '/about',
  },
  {
    label: 'Writings',
    path: '/writings',
  },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-6 md:px-6 lg:px-8">
      <Link href="/" className="group flex items-center space-x-2">
        <div
          className={cn(
            'text-primary flex size-8 items-center justify-center rounded-md',
            pathname === '/' && 'bg-primary text-white',
          )}>
          <Logo className="size-5" />
        </div>
        {/* <span className="text-xl font-semibold">fariz(s)</span> */}
      </Link>
      <nav className="flex items-center gap-6 text-sm font-medium">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={cn(
              'hover:text-primary underline-offset-4 transition-colors hover:underline',
              pathname.startsWith(link.path) &&
                'text-primary underline underline-offset-4',
            )}>
            {link.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
