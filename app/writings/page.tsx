import { Suspense } from 'react';

import { WritingTitle } from '@/components/writings/writing-title';
import { WritingList } from '@/components/writings/writing-list';
import { getMetadata } from '@/lib/data';

export function generateMetadata() {
  return getMetadata({ title: 'Writings' });
}

export default async function Posts() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <WritingTitle />
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
          I occasionally write about software engineering, frontend development,
          design systems, and whatever else I&apos;m currently exploring.
        </p>
      </div>
      <Suspense>
        <WritingList />
      </Suspense>
    </div>
  );
}
