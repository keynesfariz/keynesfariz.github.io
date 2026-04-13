import { Writing } from '@/.content-collections/generated';
import { LocalDateTime } from '@/components/local-datetime';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getMetadata, getWritings } from '@/lib/data';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ViewTransition } from 'react';
import Markdown from 'react-markdown';

export async function generateStaticParams() {
  const writings = getWritings() as Writing[];
  return writings.map((wr) => ({ slug: wr._meta.path }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const writing = getWritings(slug) as Writing | undefined;
  return getMetadata({
    title: writing?.title,
    description: writing?.description,
  });
}

export default async function PostDetail({ params }: Props) {
  const { slug } = await params;
  const writing = getWritings(slug) as Writing | undefined;

  if (!writing) {
    notFound();
  }

  return (
    <article className="flex flex-col gap-8">
      <Link
        href="/writings"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm font-medium transition-colors">
        <ArrowLeftIcon className="size-4" />
        Back to writings
      </Link>

      <header className="flex flex-col gap-4">
        <ViewTransition name={slug}>
          <h1 className="text-4xl leading-tight font-extrabold tracking-tight md:text-5xl">
            {writing.title}
          </h1>
        </ViewTransition>

        <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <time dateTime={writing.created_at} className="font-medium">
              <LocalDateTime dateTime={writing.created_at} />
            </time>
          </div>
        </div>

        {writing.url && (
          <Link
            href={writing.url}
            target="_blank"
            rel="noreferrer"
            className="text-primary font-medium wrap-break-word underline-offset-4 hover:underline">
            {writing.url}
          </Link>
        )}

        {writing.tags && writing.tags?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {writing.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <Separator />

      <div className="prose prose-neutral dark:prose-invert prose-pre:bg-zinc-900 prose-img:rounded-lg max-w-none text-lg leading-relaxed underline-offset-[3px]">
        <Markdown>{writing.content}</Markdown>
      </div>
    </article>
  );
}
