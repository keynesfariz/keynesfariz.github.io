import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc)

const FULL_DATE = 'MMMM D, YYYY';
const FULL_DATETIME = `${FULL_DATE} @ h:mm A`;

export const formatYear = (date: string) => dayjs(date).format('YYYY');

export const formatDate = (date: string) => dayjs(date).format(FULL_DATE);

export const formatDateTime = (date: string) =>
  dayjs.utc(date).local().format(FULL_DATETIME);

export const getYearRange = (startDate: string, endDate?: string) => {
  const startYear = formatYear(startDate);
  const endYear = endDate ? formatYear(endDate) : 'Present';
  return `${startYear} - ${endYear}`;
};
