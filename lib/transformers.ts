import { allWritings } from '@/.content-collections/generated';
import type GitRepoMeta from '@/types/GitRepoMeta';
import type MyWriting from '@/types/MyWriting';
import type { MyWritingItem } from '@/types/MyWriting';
import type { ResumeSchema } from '@supastuff/json-resume-types';
import dayjs from 'dayjs';

const getLocation = (location: any): string => {
  return [
    location?.address ?? '',
    location?.city ?? '',
    location?.region ?? '',
    location?.postalCode ?? '',
    location?.countryCode ?? '',
  ]
    .filter((s) => !!s)
    .join(', ');
};

export const getHomepageData = (resume: ResumeSchema) => {
  const { basics, work, education, languages, skills } = resume;

  const company =
    work && work.length && work[0].endDate === undefined
      ? work[0].name
      : undefined;

  return {
    title: basics?.label ?? 'Senior Software Engineer',
    company,
    location: getLocation(basics?.location),
    work: work?.splice(0, 2).map((item) => {
      const { position, name } = item;
      const start = dayjs(item.startDate).format('YYYY');
      const end = item.endDate ? dayjs(item.endDate).format('YYYY') : 'Present';
      return {
        position,
        name,
        date: `${start} - ${end}`,
        summary: item.highlights?.length ? item.highlights[0] : undefined,
      };
    }),
    education,
    languages,
    skills,
  };
};

export const getMyWritingItems = (): MyWritingItem[] => {
  return allWritings.map((writing) => {
    const { title, created_at, tags, description } = writing;
    return { slug: writing._meta.path, title, created_at, tags, description };
  });
};

const getTitle = (md: string) => {
  if (!md) return '';
  const EXPR = /^#\s+.+/;
  const tokens = md.split('\n');

  for (let i = 0; i < tokens.length; i++) {
    if (EXPR.test(tokens[i])) {
      return tokens[i];
    }
  }

  return '';
};

const extractTitleAndContent = (md: string) => {
  const rawTitle = getTitle(md);
  const content = md.split(rawTitle)[1];
  const title = rawTitle.split('# ')[1];
  return [title, content];
};

export const getWritingFromGit = (
  meta: GitRepoMeta,
  rawContent: string,
): MyWriting => {
  const [title, content] = extractTitleAndContent(rawContent);

  const {
    created_at,
    updated_at,
    homepage: url,
    topics: tags,
    description,
  } = meta;

  return {
    slug: meta.name,
    title,
    created_at,
    updated_at,
    url,
    tags,
    description,
    content,
  };
};

export const slugToTitle = (slug: string): string =>
  slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
