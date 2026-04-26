import { Writing } from '@/.content-collections/generated';
import { LocalDateTime } from '@/components/local-datetime';
import { Separator } from '@/components/ui/separator';
import { BackToWritingButton } from '@/components/writings/back-link';
import { TagList } from '@/components/writings/tag-list';
import { getMetadata, getWritings } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ViewTransition } from 'react';
import Markdown from 'react-markdown';

export async function generateStaticParams() {
  const writings = getWritings() as Writing[];
  return writings.map((wr) => ({ slug: wr._meta.path }));
}

export async function generateMetadata(props: PageProps<'/writings/[slug]'>) {
  const { slug } = await props.params;
  const writing = getWritings(slug) as Writing | undefined;
  return getMetadata({
    title: writing?.title,
    description: writing?.description,
  });
}

export default async function WritingDetail(
  props: PageProps<'/writings/[slug]'>,
) {
  const { slug } = await props.params;
  const writing = getWritings(slug) as Writing | undefined;

  if (!writing) {
    notFound();
  }

  const hasTags = writing.tags && writing.tags.length > 0;

  return (
    <article className="flex flex-col gap-8">
      <BackToWritingButton />

      <header className="flex flex-col gap-4">
        <ViewTransition name={slug}>
          <h1 className="text-4xl leading-tight font-extrabold tracking-tight md:text-5xl">
            {writing.title}
          </h1>
        </ViewTransition>

        <div className="text-muted-foreground flex flex-wrap items-center gap-4">
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

        {hasTags && <TagList tags={writing.tags!} />}
      </header>

      <Separator />

      <div className="prose prose-neutral dark:prose-invert prose-pre:bg-zinc-900 max-w-none text-lg leading-relaxed underline-offset-[3px]">
        <Markdown
          components={{
            a: (props) => (
              <a {...props} target="_blank" rel="noopener noreferrer" />
            ),
            img: (props) => (
              <>
                <img {...props} loading="lazy" className="mx-auto rounded-lg" />
                {props.alt && (
                  <span className="flex justify-center text-sm italic">
                    **{props.alt}**
                  </span>
                )}
              </>
            ),
          }}>
          {writing.content}
        </Markdown>
      </div>
    </article>
  );
}
