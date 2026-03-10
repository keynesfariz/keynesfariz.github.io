import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
    return [
        { slug: 'learning-react-server-components' },
        { slug: 'design-systems-with-tailwind' },
        { slug: 'typescript-advanced-patterns' },
        { slug: 'animation-in-react' },
        { slug: 'mock-post-1' },
        { slug: 'mock-post-2' },
        { slug: 'mock-post-3' },
    ];
}

export default async function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Transform slug back to readable mock title
    const mockTitle = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <article className="flex flex-col gap-8 max-w-3xl mx-auto">
            <div className="mb-2">
                <Link href="/posts" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back to posts
                </Link>
            </div>

            <header className="flex flex-col gap-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                    {mockTitle || 'Understanding React Server Components in Next.js 14'}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mt-2">
                    <div className="flex items-center gap-2">
                        <time dateTime="2024-10-24" className="font-medium">October 24, 2024</time>
                    </div>
                    <span className="text-muted-foreground/50">•</span>
                    <div className="font-medium">
                        5 min read
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">Next.js</Badge>
                    <Badge variant="secondary">Frontend</Badge>
                </div>
            </header>

            <Separator className="my-2" />

            <div className="prose prose-neutral dark:prose-invert max-w-none text-lg leading-relaxed">
                <p>
                    Server Components introduced in Next.js App Router fundamentally change how we think about rendering blocks of UI. This shift brings performance gains but also requires developers to adapt to new paradigms.
                </p>

                <h2>The Paradigm Shift</h2>
                <p>
                    Traditionally in React, all components were Client Components. This meant all the Javascript necessary to render the component would be sent to the browser.
                    With Server Components, the component renders strictly on the server, and only the resulting HTML and a lightweight JSON representation are sent to the client.
                </p>

                <blockquote>
                    "Server Components execute exclusively on the server, reducing the amount of JavaScript sent to the client and improving performance."
                </blockquote>

                <h2>When to use Client vs Server Components?</h2>
                <p>
                    As a rule of thumb, default to Server Components. Only use Client Components (via the <code>'use client'</code> directive) when you need:
                </p>
                <ul>
                    <li>Interactivity and event listeners (<code>onClick()</code>, <code>onChange()</code>)</li>
                    <li>State and Lifecycle Hooks (<code>useState()</code>, <code>useEffect()</code>)</li>
                    <li>Use of browser-only APIs</li>
                </ul>

                <h2>Data Fetching</h2>
                <p>
                    Server components shine when fetching data. Since they execute on the server, you can securely access databases and backend APIs directly without exposing secrets to the client. Here's a quick example:
                </p>

                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                    <code>{`export default async function ProductPage({ id }) {
  // Direct database query from the component
  const product = await db.product.findUnique({ where: { id } });
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}`}</code>
                </pre>

                <p>
                    By embracing Server Components, you can significantly reduce your bundle sizes while keeping your codebase clean and organized. The mental model takes some getting used to, but the performance benefits are undeniable.
                </p>
            </div>
        </article>
    );
}
