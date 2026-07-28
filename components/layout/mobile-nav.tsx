'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const globalLinks = [
  { label: 'About', path: '/about' },
  { label: 'History', path: '/resume' },
  { label: 'Writings', path: '/writings' },
];

export function MobileNav({
  rightSidebar,
  leftSidebar,
}: {
  rightSidebar?: React.ReactNode;
  leftSidebar?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close sheet on navigation
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" className="xl:hidden" />}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-75 flex-col gap-6 overflow-y-auto px-6 sm:w-100">
        <SheetHeader className="pb-0 pl-0 text-left">
          <SheetTitle className="text-lg font-bold tracking-tight">
            Navigation
          </SheetTitle>
        </SheetHeader>

        <nav className="-mx-2 flex flex-col gap-2">
          {globalLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                buttonVariants({
                  variant: pathname.startsWith(link.path)
                    ? 'secondary'
                    : 'ghost',
                }),
                'justify-start text-base',
              )}>
              {link.label}
            </Link>
          ))}
        </nav>

        {rightSidebar}
        {leftSidebar}
      </SheetContent>
    </Sheet>
  );
}
