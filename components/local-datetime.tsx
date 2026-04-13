'use client';
import { formatDateTime } from '@/lib/date-format';

interface LocalDateTimeProps {
  dateTime: string;
}

export function LocalDateTime({ dateTime }: LocalDateTimeProps) {
  return <time dateTime={dateTime}>{formatDateTime(dateTime)}</time>;
}
