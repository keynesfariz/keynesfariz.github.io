import { cache } from 'react';

import type { GitContributionResponse, GithubGist } from '@/types/Github';
import type { ResumeSchema } from '@supastuff/json-resume-types';

const RESUME_FILE_NAME = 'resume.json';

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
