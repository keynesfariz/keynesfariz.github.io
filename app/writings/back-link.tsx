import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export function BackToWritingButton() {
  return (
    <Link
      href="/writings"
      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm font-medium transition-colors">
      <ArrowLeftIcon className="size-4" />
      Back to all writings
    </Link>
  );
}
