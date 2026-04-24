'use client';
import { BackToWritingButton } from '@/components/writings/back-link';
import { useSearchParams } from 'next/navigation';

export function WritingTitle() {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');

  return (
    <>
      {tag && <BackToWritingButton />}
      <h1 className="text-4xl font-bold tracking-tight">
        {tag ? `# ${tag}` : 'Writings'}
      </h1>
    </>
  );
}
