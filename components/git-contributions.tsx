import { Card } from '@/components/ui/card';
import { GitResponse } from '@/types/GitContributions';
import dayjs from 'dayjs';

interface GitContributionsProps {
  contributions: GitResponse['contributions'];
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
          let colorClass = 'bg-muted/30';
          if (contribution.level === 4) colorClass = 'bg-primary';
          else if (contribution.level === 3) colorClass = 'bg-primary/70';
          else if (contribution.level === 2) colorClass = 'bg-primary/40';
          else if (contribution.level === 1) colorClass = 'bg-primary/20';

          const contributionDate = dayjs(contribution.date).format(
            'MMMM D, YYYY',
          );
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
