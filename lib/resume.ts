import type { ResumeSchema } from '@supastuff/json-resume-types';

import { getYearRange } from '@/lib/date-format';

const getLocation = (
  location?: NonNullable<ResumeSchema['basics']>['location'],
): string => {
  return [
    location?.address,
    location?.city,
    location?.region,
    location?.postalCode,
    location?.countryCode,
  ]
    .filter(Boolean)
    .join(', ');
};

const getCurrentCompany = (work?: ResumeSchema['work']) => {
  const currentWork = work?.[0];
  return currentWork?.endDate === undefined ? currentWork?.name : undefined;
};

const getRecentWork = (work?: ResumeSchema['work']) => {
  return work?.slice(0, 2).map((item) => ({
    position: item.position,
    name: item.name,
    date: getYearRange(item.startDate!, item.endDate),
    summary: item.highlights?.[0],
  }));
};

export const getHomepageData = (resume: ResumeSchema) => {
  const { basics, work, education, languages, skills } = resume;

  return {
    title: basics?.label ?? 'Senior Software Engineer',
    company: getCurrentCompany(work),
    location: getLocation(basics?.location),
    work: getRecentWork(work),
    education,
    languages,
    skills,
  };
};
