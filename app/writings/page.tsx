import { Suspense } from 'react';

import { WritingTitle } from '@/components/writings/writing-title';
import { WritingList } from '@/components/writings/writing-list';
import { MainLayout } from '@/components/layout/main-layout';
import { getMetadata } from '@/lib/seo';

export function generateMetadata() {
  return getMetadata({ title: 'Writings' });
}

export default async function Posts() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <WritingTitle />
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            I occasionally write about my side projects, weird experiments with
            AI tools, and whatever else I happen to be hyper-fixated on right
            now 😃.
          </p>
        </div>
        <Suspense>
          <WritingList />
        </Suspense>
      </div>
    </MainLayout>
  );
}
