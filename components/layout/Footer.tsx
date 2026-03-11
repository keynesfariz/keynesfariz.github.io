import { Separator } from '@/components/ui/separator';
import { FileTextIcon, GithubIcon, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mx-auto mt-12 w-full max-w-4xl px-4 py-8 md:px-6 lg:px-8">
      <Separator className="mb-8" />
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Fariz
        </div>

        <div className="flex items-center gap-6">
          <Link
            href={`https://linkedin.com/in/${process.env.GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors">
            <LinkedinIcon className="size-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href={`https://github.com/${process.env.GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors">
            <GithubIcon className="size-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href={`https://registry.jsonresume.org/${process.env.GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
            <FileTextIcon className="size-5" />
            <span className="text-sm font-medium">Resume</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
