import rehypeHighlight from 'rehype-highlight';
import { notFound } from 'next/navigation';
import { ViewTransition } from 'react';
import Markdown from 'react-markdown';
import Link from 'next/link';

import { BackToWritingButton } from '@/components/writings/back-link';
import { LocalDateTime } from '@/components/local-datetime';
import { getResponsiveImageProps } from '@/lib/image-utils';
import { Writing } from '@/.content-collections/generated';
import { TagList } from '@/components/writings/tag-list';
import { Separator } from '@/components/ui/separator';
import { getMetadata, getWritings } from '@/lib/data';
import { extractImageDimensions } from '@/lib/utils';
import 'highlight.js/styles/github-dark.css';

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

      <div className="prose prose-neutral dark:prose-invert prose-a:text-primary max-w-none text-lg leading-relaxed underline-offset-[3px]">
        <Markdown
          rehypePlugins={[rehypeHighlight]}
          components={{
            a: (props) => (
              <a {...props} target="_blank" rel="noopener noreferrer" />
            ),
            img: (props) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { node, ...rest } = props;
              const { width, height } = extractImageDimensions(
                rest.src as string | undefined,
              );

              const srcSet = getResponsiveImageProps(
                rest.src as string | undefined,
                width,
              );

              return (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={rest.alt || ''}
                    loading="lazy"
                    sizes="auto"
                    className="h-auto w-full rounded-lg"
                    style={
                      width && height
                        ? { aspectRatio: `${width} / ${height}` }
                        : undefined
                    }
                    width={width}
                    height={height}
                    srcSet={srcSet}
                    {...rest}
                  />
                  {rest.alt && (
                    <span className="mt-2 flex justify-center text-sm italic">
                      {rest.alt}
                    </span>
                  )}
                </>
              );
            },
          }}>
          {writing.content}
        </Markdown>
      </div>
    </article>
  );
}
