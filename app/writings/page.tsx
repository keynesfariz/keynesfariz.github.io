import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getGitRepos, getPageTitle } from '@/lib/data';
import { formatDateTime } from '@/lib/date-format';
import { getMyWritingItems } from '@/lib/transformers';
import Link from 'next/link';
import { ViewTransition } from 'react';

export function generateMetadata() {
  return {
    title: getPageTitle('Writings'),
  };
}

export default async function Posts() {
  const writings = getMyWritingItems();
  const featuredWritings = await getGitRepos();

  const allWritings = [...writings, ...featuredWritings].sort((a, b) =>
    a.created_at > b.created_at ? -1 : 1,
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight">Writings</h1>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
          I occasionally write about software engineering, frontend development,
          design systems, and whatever else I'm currently exploring.
        </p>
      </div>

      <div className="grid gap-6">
        {allWritings.map((post) => (
          <Link
            key={post.slug}
            href={`/writings/${post.slug}`}
            className="group">
            <Card className="hover:border-primary/50 bg-card/50 hover:bg-card transition-all duration-200 hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">
                    {formatDateTime(post.created_at)}
                  </span>
                </div>
                <ViewTransition name={post.slug}>
                  <CardTitle className="group-hover:text-primary text-2xl transition-colors">
                    {post.title}
                  </CardTitle>
                </ViewTransition>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-base leading-relaxed">
                  {post.description}
                </CardDescription>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs font-medium">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
