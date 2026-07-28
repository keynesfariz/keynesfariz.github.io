'use client';

import { useEffect, useState } from 'react';

import { TOCItem } from '@/lib/toc';
import { cn } from '@/lib/utils';

export function TableOfContents({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' },
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  const minLevel = Math.min(...items.map((item) => item.level));

  return (
    <div className="space-y-4">
      <h3 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
        On this page
      </h3>
      <ul className="flex flex-col space-y-2 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - minLevel) * 0.75}rem` }}
            className="pt-0.5">
            <a
              href={`#${item.id}`}
              className={cn(
                'hover:text-foreground inline-block no-underline transition-colors',
                item.id === activeId
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground',
              )}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
