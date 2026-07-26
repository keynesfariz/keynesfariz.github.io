import { ArrowRight } from 'lucide-react';
import { ViewTransition } from 'react';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Writing } from '@/.content-collections/generated';
import { DateTime } from '@/components/ui/datetime';
import { Badge } from '../ui/badge';

interface WritingCardProps {
  writing: Writing;
}

// fallow-ignore-next-line complexity
export function WritingCard({ writing }: WritingCardProps) {
  const firstTag =
    writing.tags && writing.tags.length > 0 ? writing.tags[0] : null;
  const slug = writing._meta.path;

  return (
    <ViewTransition name={slug}>
      <Link href={`writings/${slug}`} className="block h-full">
        <Card className="group hover:border-primary/30 border-foreground/10 flex h-full cursor-pointer flex-col border shadow-none ring-0 transition duration-300 hover:shadow-lg">
          <CardHeader className="flex-none">
            {firstTag && (
              <Badge className="mb-2 -translate-x-1">#{firstTag}</Badge>
            )}
            <CardTitle className="group-hover:text-primary mb-2 text-2xl leading-tight font-semibold transition-colors">
              {writing.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="grow pb-4">
            {writing.description && (
              <CardDescription className="text-muted-foreground line-clamp-3 text-base leading-relaxed">
                {writing.description}
              </CardDescription>
            )}
          </CardContent>

          <CardFooter className="border-border/50 mx-6 mt-auto mb-2 flex items-center justify-between border-t px-0 pt-4 text-sm">
            <span className="text-muted-foreground font-medium">
              <DateTime dateTime={writing.created_at} />
            </span>
            <span className="text-primary flex items-center gap-1 font-medium whitespace-nowrap transition-all group-hover:gap-2">
              Read More <ArrowRight className="h-4 w-4 shrink-0" />
            </span>
          </CardFooter>
        </Card>
      </Link>
    </ViewTransition>
  );
}
