import { getWritingFromGit } from '@/lib/transformers';
import type GitContributionResponse from '@/types/GitContributionResponse';
import type GithubGist from '@/types/GithubGist';
import type GitRepoMeta from '@/types/GitRepoMeta';
import type { ResumeSchema } from '@supastuff/json-resume-types';
import { cache } from 'react';

export const getPageTitle = (title?: string) => {
  const NAME = 'Fariz Muhammad';
  return title ? `${title} | ${NAME}` : `${NAME}, A Senior Software Engineer`;
};

async function cacheFetch<T>(
  url: string,
  init: RequestInit = { cache: 'force-cache' },
) {
  const res = await fetch(url, init);
  return res.json() as T;
}

const RESUME_FILE_NAME = 'resume.json';

export async function getResumeSchema() {
  const data = await cacheFetch<GithubGist>(
    `https://api.github.com/gists/${process.env.NEXT_GIST_ID}`,
  );
  return JSON.parse(data.files[RESUME_FILE_NAME].content) as ResumeSchema;
}

export async function getGitContributions(
  year: string = 'last',
): Promise<GitContributionResponse> {
  const data = await cacheFetch<GitContributionResponse>(
    `https://github-contributions-api.jogruber.de/v4/${process.env.NEXT_USERNAME}?y=${year}`,
  );

  return {
    ...data,
    updated_at: (new Date()).toISOString(),
  }
}

async function getReadmeContent(baseUrl: string) {
  const res = await fetch(`${baseUrl}/readme`, {
    cache: 'force-cache',
    headers: {
      Accept: 'application/vnd.github.raw',
    },
  });

  return res.text();
}

export const getWriting = cache(async (slug: string, isFromRepo: boolean = false) => {
  if (isFromRepo) {
    const baseUrl = `https://api.github.com/repos/${process.env.NEXT_USERNAME}/${slug}`;
    const metaData = cacheFetch<GitRepoMeta>(baseUrl);
    const contentData = getReadmeContent(baseUrl);
    const [meta, content] = await Promise.all([metaData, contentData]);
    return getWritingFromGit(meta, content);
  }

  // handle from local files
})
