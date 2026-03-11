import { ResumeSchema } from "@supastuff/json-resume-types";
import dayjs from "dayjs";

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
      const { position, name } = item
      const start = dayjs(item.startDate).format('YYYY')
      const end = item.endDate ? dayjs(item.endDate).format('YYYY') : 'Present'
      return {
        position,
        name,
        date: `${start} - ${end}`,
        summary: item.highlights?.length ? item.highlights[0] : undefined
      }
    }),
    education,
    languages,
    skills,
  }
}