'use client';
import { formatDateTime } from '@/lib/date-format';

interface DateTimeProps {
  dateTime: string;
}

export function DateTime({ dateTime }: DateTimeProps) {
  return <time dateTime={dateTime}>{formatDateTime(dateTime)}</time>;
}
