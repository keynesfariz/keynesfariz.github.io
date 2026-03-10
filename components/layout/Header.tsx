'use client';
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
    label: 'Home',
    path: '/',
    exact: true,
  },
  {
    label: 'About',
    path: '/about',
  },
  {
    label: 'Posts',
    path: '/posts',
  },
];

import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-6 md:px-6 lg:px-8">
      <Link
        href="/"
        className="text-xl font-bold tracking-tighter transition-opacity hover:opacity-80">
        fariz.me
      </Link>
      <nav className="flex items-center gap-6 text-sm font-medium">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={cn(
              'hover:text-primary underline-offset-4 transition-colors hover:underline',
              (link.exact
                ? pathname === link.path
                : pathname.startsWith(link.path)) &&
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
