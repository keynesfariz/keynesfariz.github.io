import type { GitContributionResponse, GithubGist } from '@/types/Github';
import type { ResumeSchema } from '@supastuff/json-resume-types';
import { allWritings } from 'content-collections';
import type { Metadata } from 'next';
import { cache } from 'react';

const RESUME_FILE_NAME = 'resume.json';

export const getMetadata = (rawMeta?: Metadata): Metadata => {
  const NAME = 'Fariz Muhammad';
  const title =
    rawMeta && rawMeta.title
      ? `${rawMeta.title} | ${NAME}`
      : `${NAME}, A Senior Software Engineer`;
  return { ...rawMeta, title };
};

async function cacheFetch<T>(
  url: string,
  init: RequestInit = { cache: 'force-cache' },
) {
  const res = await fetch(url, init);
  return res.json() as T;
}

export async function getResumeSchema() {
  const data = await cacheFetch<GithubGist>(
    `https://api.github.com/gists/${process.env.NEXT_GIST_ID}`,
  );
  return JSON.parse(data.files[RESUME_FILE_NAME].content) as ResumeSchema;
}

export const getGitContributions = cache(
  async (year: string = 'last'): Promise<GitContributionResponse> => {
    const data = await cacheFetch<GitContributionResponse>(
      `https://github-contributions-api.jogruber.de/v4/${process.env.NEXT_USERNAME}?y=${year}`,
    );

    return {
      ...data,
      updated_at: new Date().toISOString(),
    };
  },
);

export const getWritings = cache((slug?: string, isFeatured?: boolean) => {
  if (slug) {
    return allWritings.find((wr) => wr._meta.path === slug);
  }

  const sortedWritings = allWritings.sort((a, b) =>
    a.created_at > b.created_at ? -1 : 1,
  );

  if (isFeatured) {
    return sortedWritings.filter((wr) => !!wr.is_featured);
  }

  return sortedWritings;
});
