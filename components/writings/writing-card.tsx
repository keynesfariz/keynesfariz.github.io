import { Writing } from '@/.content-collections/generated';
import { LocalDateTime } from '@/components/local-datetime';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TagList } from '@/components/writings/tag-list';
import Link from 'next/link';
import { ViewTransition } from 'react';

interface WritingCardProps {
  writing: Writing;
}

export function WritingCard({ writing }: WritingCardProps) {
  const hasTags = writing.tags && writing.tags.length > 0;
  const slug = writing._meta.path;

  return (
    <Card className="group hover:border-primary/50 bg-card/50 hover:bg-card transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-1">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-muted-foreground text-sm">
            <LocalDateTime dateTime={writing.created_at} />
          </span>
        </div>
        <ViewTransition name={slug}>
          <Link href={`writings/${slug}`}>
            <CardTitle className="group-hover:text-primary text-2xl transition-colors">
              {writing.title}
            </CardTitle>
          </Link>
        </ViewTransition>
      </CardHeader>
      {(writing.description || hasTags) && (
        <CardContent className="pt-2">
          {writing.description && (
            <CardDescription className="text-muted-foreground mb-3! line-clamp-3">
              {writing.description}
            </CardDescription>
          )}
          {hasTags && <TagList tags={writing.tags!} />}
        </CardContent>
      )}
    </Card>
  );
}
