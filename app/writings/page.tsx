import { WritingCard } from '@/components/writing-card';
import { getPageTitle } from '@/lib/data';

export function generateMetadata() {
  return {
    title: getPageTitle('Writings'),
  };
}

export default async function Posts() {
  // const writings = getMyWritingItems();
  // const featuredWritings = await getGitRepos();

  // const allWritings = sortWritingsByDate([...writings, ...featuredWritings]);
  const allWritings: any[] = [];

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
          <WritingCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
