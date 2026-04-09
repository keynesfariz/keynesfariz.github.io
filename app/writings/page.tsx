import { Writing } from '@/.content-collections/generated';
import { WritingCard } from '@/components/writing-card';
import { getMetadata, getWritings } from '@/lib/data';

export function generateMetadata() {
  return getMetadata({ title: 'Writings' });
}

export default async function Posts() {
  const allWritings = getWritings() as Writing[];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight">Writings</h1>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
          I occasionally write about software engineering, frontend development,
          design systems, and whatever else I&apos;m currently exploring.
        </p>
      </div>

      <div className="grid gap-6">
        {allWritings.map((post) => (
          <WritingCard key={post._meta.path} post={post} />
        ))}
      </div>
    </div>
  );
}
