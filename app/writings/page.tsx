import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getPageTitle } from '@/lib/data';
import { slugToTitle } from '@/lib/transformers';
import { allWritings } from '@/lib/writings';
import dayjs from 'dayjs';
import Link from 'next/link';
import { ViewTransition } from 'react';

export function generateMetadata() {
  return {
    title: getPageTitle('Writings'),
  };
}

const mockPosts = allWritings.map((slug, i) => {
  const title = slugToTitle(slug);
  return {
    slug,
    title,
    date: dayjs().subtract(i, 'w').format('MMMM D, YYYY'),
    readTime: '5 min read',
    description:
      'A deep dive into how Server Components change the way we think about building React applications and managing state across the network boundary.',
    tags: ['React', 'Next.js'],
  };
});

export default function Posts() {
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
        {mockPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/writings/${post.slug}`}
            className="group">
            <Card className="hover:border-primary/50 bg-card/50 hover:bg-card transition-all duration-200 hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-muted-foreground text-sm font-medium">
                    {post.date}
                  </span>
                  <span className="text-muted-foreground/50">•</span>
                  <span className="text-muted-foreground text-sm">
                    {post.readTime}
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
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
