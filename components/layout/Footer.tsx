import { Separator } from '@/components/ui/separator';
import { FileTextIcon, GithubIcon, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8 mt-12">
            <Separator className="mb-8" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Fariz. All rights reserved.
                </div>

                <div className="flex items-center gap-6">
                    <Link
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <LinkedinIcon className="w-5 h-5" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <GithubIcon className="w-5 h-5" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link
                        href="/resume.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                    >
                        <FileTextIcon className="w-5 h-5" />
                        <span className="text-sm font-medium">Resume</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
