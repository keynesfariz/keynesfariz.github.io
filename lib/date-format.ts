import { format, parseISO } from 'date-fns';

const FULL_DATE = 'MMMM d, yyyy';
const FULL_DATETIME = `${FULL_DATE} @ h:mm a`;

export const formatYear = (date: string) => format(parseISO(date), 'yyyy');

export const formatDate = (date: string) => format(parseISO(date), FULL_DATE);

export const formatDateTime = (date: string) =>
  format(parseISO(date), FULL_DATETIME);

export const getYearRange = (startDate: string, endDate?: string) => {
  const startYear = formatYear(startDate);
  const endYear = endDate ? formatYear(endDate) : 'Present';
  return `${startYear} - ${endYear}`;
};
