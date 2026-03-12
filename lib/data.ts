import type { GitResponse as GitContributionResponse } from '@/types/GitContributions';
import GithubGist from '@/types/GithubGist';
import type { ResumeSchema } from '@supastuff/json-resume-types';

export const getPageTitle = (title?: string) => {
  const NAME = 'Fariz Muhammad';
  return title ? `${title} | ${NAME}` : `${NAME}, A Senior Software Engineer`;
};

async function cacheFetch(url: string) {
  const res = await fetch(url, { cache: 'force-cache' });
  if (!res.ok) throw new Error(res.statusText);
  return res;
}

const RESUME_FILE_NAME = 'resume.json';

export async function getResumeSchema() {
  const res = await cacheFetch(
    `https://api.github.com/gists/${process.env.NEXT_GIST_ID}`,
  );
  const data = (await res.json()) as GithubGist;
  return JSON.parse(data.files[RESUME_FILE_NAME].content) as ResumeSchema;
}

export async function getGitContributions(
  year: string = 'last',
): Promise<GitContributionResponse> {
  const res = await cacheFetch(
    `https://github-contributions-api.jogruber.de/v4/${process.env.NEXT_USERNAME}?y=${year}`,
  );
  const data = (await res.json()) as GitContributionResponse;
  return data;
}

export async function getWriting(slug: string, fromRepo: boolean = false) {
  if (fromRepo) {
    const res = await cacheFetch(
      `https://raw.githubusercontent.com/${process.env.NEXT_USERNAME}/${slug}/main/README.md`,
    );
    return await res.text();
  }

  // handle from local files
}
