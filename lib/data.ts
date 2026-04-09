import type { GitContributionResponse, GithubGist } from '@/types/Github';
import type { ResumeSchema } from '@supastuff/json-resume-types';
import { cache } from 'react';

const USERNAME = process.env.NEXT_USERNAME ?? '';
const RESUME_FILE_NAME = 'resume.json';

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

export async function getResumeSchema() {
  const data = await cacheFetch<GithubGist>(
    `https://api.github.com/gists/${process.env.NEXT_GIST_ID}`,
  );
  return JSON.parse(data.files[RESUME_FILE_NAME].content) as ResumeSchema;
}

export const getGitContributions = cache(
  async (year: string = 'last'): Promise<GitContributionResponse> => {
    const data = await cacheFetch<GitContributionResponse>(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${year}`,
    );

    return {
      ...data,
      updated_at: new Date().toISOString(),
    };
  },
);

export async function getGitRepos(): Promise<any[]> {
  // const data = await cacheFetch<GitRepoMeta[]>(
  //   `https://api.github.com/users/${USERNAME}/repos`,
  // );

  return []
}

// async function fetchReadmeContent(baseUrl: string) {
//   const res = await fetch(`${baseUrl}/readme`, {
//     cache: 'force-cache',
//     headers: {
//       Accept: 'application/vnd.github.raw',
//     },
//   });

//   return res.text();
// }

