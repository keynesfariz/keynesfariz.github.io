import { notFound } from 'next/navigation';

import { Writing } from '@/.content-collections/generated';
import { getWritings } from '@/lib/content.server';
import { generateTOC } from '@/lib/toc';
import { TableOfContents } from '../../../writings/toc';

export default async function WritingSidebarPage(
  props: PageProps<'/writings/[slug]'>,
) {
  const { slug } = await props.params;
  const writing = getWritings(slug) as Writing | undefined;

  if (!writing) {
    notFound();
  }

  const toc = generateTOC(writing.content);

  if (toc.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full flex-col">
      <TableOfContents items={toc} />
    </div>
  );
}
