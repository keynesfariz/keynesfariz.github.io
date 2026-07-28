'use client';
import { usePathname } from 'next/navigation';
import { Bot } from 'lucide-react';
import Link from 'next/link';

import { MobileNav } from '@/components/layout/mobile-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { MyLogo } from '@/components/my-logo';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

type NavLink = {
  label: string | React.ReactNode;
  path: string;
  exact?: boolean;
};

const links: NavLink[] = [
  {
    label: 'About',
    path: '/about',
  },
  {
    label: 'History',
    path: '/resume',
  },
  {
    label: 'Writings',
    path: '/writings',
  },
];

export function Header({
  mobileRightSidebar,
  mobileLeftSidebar,
}: {
  mobileRightSidebar?: React.ReactNode;
  mobileLeftSidebar?: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-8 py-6 md:p-12">
      <Link
        href="/"
        className="group flex items-center space-x-2"
        aria-label="Logo of Fariz's personal website">
        <div
          className={cn(
            'text-primary flex size-8 items-center justify-center rounded-md',
            'transition-all duration-75 ease-in-out',
            pathname === '/'
              ? 'bg-primary text-white'
              : 'bg-muted hover:bg-primary hover:text-white',
          )}>
          <MyLogo className="size-5" />
        </div>
        {/* <span className="text-xl font-semibold">fariz(s)</span> */}
      </Link>
      <nav className="flex items-center text-sm font-medium">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={cn(
              'hover:text-primary mr-6 hidden underline-offset-4 transition-colors hover:underline xl:block',
              pathname.startsWith(link.path) &&
                'text-primary underline underline-offset-4',
            )}>
            {link.label}
          </Link>
        ))}
        <div className="flex items-center space-x-2">
          <Link
            href="/chat"
            className={buttonVariants({
              size: 'icon',

              variant: pathname.startsWith('/chat') ? 'default' : 'ghost',
            })}>
            <Bot className="size-5" />
          </Link>
          <ThemeToggle />
          <MobileNav
            rightSidebar={mobileRightSidebar}
            leftSidebar={mobileLeftSidebar}
          />
        </div>
      </nav>
    </header>
  );
}
