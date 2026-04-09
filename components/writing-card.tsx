import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDateTime } from '@/lib/date-format';
import Link from 'next/link';
import { ViewTransition } from 'react';

interface WritingCardProps {
  post: any;
}

export function WritingCard({ post }: WritingCardProps) {
  const hasTags = post.tags && post.tags.length > 0;
  return (
    <Link key={post.slug} href={`/writings/${post.slug}`} className="group">
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
        {(post.description || hasTags) && (
          <CardContent>
            {post.description && (
              <CardDescription className="text-muted-foreground line-clamp-3">
                {post.description}
              </CardDescription>
            )}
            {hasTags && (
              <div className="mt-auto flex flex-wrap gap-2">
                {post.tags!.map((tag: string) => (
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
        )}
      </Card>
    </Link>
  );
}
