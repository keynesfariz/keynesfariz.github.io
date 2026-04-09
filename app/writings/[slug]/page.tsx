// const USERNAME = process.env.NEXT_USERNAME ?? '';

export async function generateStaticParams() {
  return [{ slug: 'hello-world' }];
  /* const featured = featuredRepos.map((slug) => ({ slug }));
  const writings = allWritings.map((wr) => ({
    slug: wr._meta.path,
  }));

  return [...featured, ...writings]; */
}

// const guessIsFromRepo = (slug: string): boolean => {
//   return false;
//   // using `allWritings` as the comparison to enable dynamic fetching
//   // for writings that are not from the repo on development,
//   // while still allowing the ones from the repo to be statically generated
//   // return allWritings.findIndex((wr) => wr._meta.path === slug) === -1;
// };

type Props = {
  params: Promise<{ slug: string }>;
};

/* export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const isFromRepo = guessIsFromRepo(slug);
  const writing = await getWriting(slug, isFromRepo);

  if (writing) {
    const { title, description } = writing;
    return {
      title: getPageTitle(title),
      description,
    };
  }

  return {
    title: getPageTitle(slugToTitle(slug)),
  };
} */

export default async function PostDetail({ params }: Props) {
  const { slug } = await params;
  const { default: Post } = await import(`@/contents/${slug}.md`);
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none text-lg leading-relaxed">
      <Post />
    </div>
  );

  /* const isFromRepo = guessIsFromRepo(slug);
  const repoLink = `https://github.com/${USERNAME}/${slug}`;

  const writing = await getWriting(slug, isFromRepo);

  if (!writing) {
    notFound();
  } */

  /* return (
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
            <time dateTime="2024-10-24" className="font-medium">
              {formatDateTime(writing.created_at)}
            </time>
          </div>
        </div>

        {writing.url && (
          <Link
            href={writing.url}
            target="_blank"
            rel="noreferrer"
            className="text-primary font-medium underline-offset-4 hover:underline">
            {writing.url}
          </Link>
        )}

        {writing.tags!.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {writing.tags!.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <Separator className="my-2" />

      <div className="prose prose-neutral dark:prose-invert max-w-none text-lg leading-relaxed">
        <Markdown>{writing.content}</Markdown>
      </div>

      {isFromRepo && (
        <div>
          Source code:{' '}
          <Link
            href={repoLink}
            target="_blank"
            rel="noreferrer"
            className="text-primary font-medium underline-offset-4 hover:underline">
            {repoLink}
          </Link>
        </div>
      )}
    </article>
  ); */
}
