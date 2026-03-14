import { Card } from '@/components/ui/card';
import { formatDate } from '@/lib/date-format';
import type GitContributionResponse from '@/types/GitContributionResponse';
import dayjs from 'dayjs';

interface GitContributionsProps {
  contributions: GitContributionResponse['contributions'];
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const getContributionColor = (level: number) => {
  switch (level) {
    case 4:
      return 'bg-primary';
    case 3:
      return 'bg-primary/70';
    case 2:
      return 'bg-primary/40';
    case 1:
      return 'bg-primary/20';
    default:
      return 'bg-muted/30';
  }
};

const GitContributions = ({ contributions }: GitContributionsProps) => {
  const startDate = dayjs(contributions[0].date);
  const startDay = +startDate.format('D');
  const startMonth = +startDate.format('M');
  const numOfHeaders = startDay > 7 ? 13 : 12; // headers (months) to loop

  return (
    <Card className="border-border bg-card/50 overflow-x-auto p-4">
      <div className="text-muted-foreground flex min-w-185 justify-between text-xs">
        {[...Array(numOfHeaders).keys()].map((_, i) => {
          // 12 is fixed number of how many months we have in a year
          const idx = (i + startMonth - 1) % 12;
          return <span key={i}>{months[idx]}</span>;
        })}
      </div>
      <div className="grid w-full min-w-185 grid-flow-col grid-rows-7 gap-1">
        {contributions.map((contribution) => {
          const colorClass = getContributionColor(contribution.level);

          const contributionDate = formatDate(contribution.date);
          const contributionText =
            contribution.count === 0
              ? `No contributions on ${contributionDate}`
              : `${contribution.count} contribution${contribution.count > 1 ? 's' : ''} on ${contributionDate}`;

          return (
            <div
              key={contribution.date}
              className={`size-2.5 rounded-xs ${colorClass} hover:ring-ring transition-all hover:ring-1`}
              title={contributionText}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default GitContributions;
