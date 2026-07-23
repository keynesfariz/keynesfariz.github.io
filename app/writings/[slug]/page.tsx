import rehypeHighlight from 'rehype-highlight';
import React, { ViewTransition } from 'react';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import Link from 'next/link';

import { BackToWritingButton } from '@/components/writings/back-link';
import { extractImageDimensions, slugify } from '@/lib/utils';
import { LocalDateTime } from '@/components/local-datetime';
import { TableOfContents } from '@/components/writings/toc';
import { getResponsiveImageProps } from '@/lib/image-utils';
import { Writing } from '@/.content-collections/generated';
import { TagList } from '@/components/writings/tag-list';
import { Separator } from '@/components/ui/separator';
import { getMetadata, getWritings } from '@/lib/data';
import 'highlight.js/styles/github-dark.css';
import { generateTOC } from '@/lib/toc';

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

const extractText = (node: any): string => {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node))
    return extractText((node.props as any).children);
  return '';
};

const Heading = ({ level, children, ...props }: any) => {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  const id = slugify(extractText(children));
  return (
    <Tag id={id} className="group scroll-m-20" {...props}>
      <a href={`#${id}`} className="text-foreground no-underline">
        {children}
      </a>
    </Tag>
  );
};

export default async function WritingDetail(
  props: PageProps<'/writings/[slug]'>,
) {
  const { slug } = await props.params;
  const writing = getWritings(slug) as Writing | undefined;

  if (!writing) {
    notFound();
  }

  const hasTags = writing.tags && writing.tags.length > 0;
  const toc = generateTOC(writing.content);

  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
      <article className="flex w-full min-w-0 flex-1 flex-col gap-8">
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

        {toc.length > 0 && (
          <div className="block xl:hidden">
            <TableOfContents items={toc} />
            <Separator className="mt-8" />
          </div>
        )}

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
              h2: (props) => <Heading level={2} {...props} />,
              h3: (props) => <Heading level={3} {...props} />,
              h4: (props) => <Heading level={4} {...props} />,
              h5: (props) => <Heading level={5} {...props} />,
              h6: (props) => <Heading level={6} {...props} />,
            }}>
            {writing.content}
          </Markdown>
        </div>
      </article>

      {toc.length > 0 && (
        <aside className="fixed right-10 hidden max-w-52 shrink-0 pt-14 xl:block">
          <TableOfContents items={toc} />
        </aside>
      )}
    </div>
  );
}
