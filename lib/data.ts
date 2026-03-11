import type { GitResponse } from '@/types/GitContributions';
import GithubGist from '@/types/GithubGist';
import type { ResumeSchema } from '@supastuff/json-resume-types';

const RESUME_FILE_NAME = 'resume.json';

export async function getResumeSchema(gistId: string) {
  const res = await fetch(`https://api.github.com/gists/${gistId}`, {
    cache: 'force-cache',
  });
  if (!res.ok) throw new Error(res.statusText);
  const data = (await res.json()) as GithubGist;
  return JSON.parse(data.files[RESUME_FILE_NAME].content) as ResumeSchema;
}

export async function getGitContributions(
  username: string,
  year: string = 'last',
): Promise<GitResponse> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`,
    { cache: 'force-cache' },
  );
  if (!res.ok) throw new Error(res.statusText);
  const data = (await res.json()) as GitResponse;
  return data;
}
