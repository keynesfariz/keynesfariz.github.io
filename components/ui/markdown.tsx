import type { Components } from 'react-markdown';

import { extractImageDimensions } from '@/lib/utils';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import ReactMarkdown from 'react-markdown';
import { slugify } from '@/lib/string';
import React from 'react';

const extractText = (node: React.ReactNode): string => {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node))
    return extractText((node.props as { children?: React.ReactNode }).children);
  return '';
};

const Heading = ({
  level,
  children,
  ...props
}: {
  level: number;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>) => {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  const id = slugify(extractText(children));
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag id={id} className="group scroll-m-20" {...(props as any)}>
      <a href={`#${id}`} className="text-foreground font-bold no-underline">
        {children}
      </a>
    </Tag>
  );
};

export function Markdown({
  content,
  components,
}: {
  content: string;
  components?: Components;
}) {
  return (
    <ReactMarkdown
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
        ...components,
      }}>
      {content}
    </ReactMarkdown>
  );
}
