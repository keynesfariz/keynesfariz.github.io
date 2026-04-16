import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface TagListProps {
  tags: string[];
}

export function TagList({ tags }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag: string) => (
        <Badge
          key={tag}
          variant="secondary"
          className="text-xs font-medium"
          render={<Link href={`/writings?tag=${tag}`}>{tag}</Link>}
        />
      ))}
    </div>
  );
}
