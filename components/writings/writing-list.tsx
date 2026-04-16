'use client';
import { Writing } from '@/.content-collections/generated';
import { WritingCard } from '@/components/writings/writing-card';
import { getWritings } from '@/lib/data';
import { useSearchParams } from 'next/navigation';

export function WritingList() {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');
  const allWritings = getWritings() as Writing[];

  const filteredWritings = tag
    ? allWritings.filter((wr) => wr.tags && wr.tags.includes(tag))
    : allWritings;

  return (
    <div className="grid gap-6">
      {filteredWritings.map((writing) => (
        <WritingCard key={writing._meta.path} writing={writing} />
      ))}
    </div>
  );
}
