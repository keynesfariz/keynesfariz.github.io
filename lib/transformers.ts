// import { allWritings } from '@/.content-collections/generated';
import { getYearRange } from '@/lib/date-format';
import type { ResumeSchema } from '@supastuff/json-resume-types';

const getLocation = (location: any): string => {
  const parts = [
    location?.address,
    location?.city,
    location?.region,
    location?.postalCode,
    location?.countryCode,
  ].filter(Boolean);

  return parts.join(', ');
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
    work: work?.slice(0, 2).map((item) => {
      const { position, name } = item;
      return {
        position,
        name,
        date: getYearRange(item.startDate!, item.endDate),
        summary: item.highlights?.length ? item.highlights[0] : undefined,
      };
    }),
    education,
    languages,
    skills,
  };
};

// const getTitle = (md: string) => {
//   if (!md) return '';
//   const EXPR = /^#\s+.+/;
//   const tokens = md.split('\n');

//   for (let i = 0; i < tokens.length; i++) {
//     if (EXPR.test(tokens[i])) {
//       return tokens[i];
//     }
//   }

//   return '';
// };
