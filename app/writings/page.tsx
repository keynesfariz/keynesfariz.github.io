import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

const mockPosts = [
  {
    slug: 'learning-react-server-components',
    date: 'Oct 24, 2024',
    readTime: '5 min read',
    title: 'Understanding React Server Components in Next.js 14',
    description:
      'A deep dive into how Server Components change the way we think about building React applications and managing state across the network boundary.',
    tags: ['React', 'Next.js'],
  },
  {
    slug: 'design-systems-with-tailwind',
    date: 'Sep 12, 2024',
    readTime: '6 min read',
    title: 'Building Scalable Design Systems with Tailwind CSS',
    description:
      'How to combine the utility-first approach of Tailwind with structured design tokens to create robust component libraries that scale.',
    tags: ['CSS', 'Design'],
  },
  {
    slug: 'typescript-advanced-patterns',
    date: 'Aug 05, 2024',
    readTime: '8 min read',
    title: 'Advanced TypeScript Patterns for Modern Frontend',
    description:
      'Going beyond basic interfaces to explore utility types, conditional types, and generic constraints that make our code safer and more expressive.',
    tags: ['TypeScript', 'Frontend'],
  },
  {
    slug: 'animation-in-react',
    date: 'Jul 21, 2024',
    readTime: '4 min read',
    title: 'Creating Fluid Animations in React without complex libraries',
    description:
      "Sometimes we don't need Framer Motion. Here is how you can use simple CSS transitions and basic hooks to make UI feel alive.",
    tags: ['React', 'Animation'],
  },
];

export default function Posts() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight">Writings</h1>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
          I occasionally write about software engineering, frontend development,
          design systems, and whatever else I'm currently exploring.
        </p>
      </div>

      <div className="grid gap-6">
        {mockPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/writings/${post.slug}`}
            className="group">
            <Card className="hover:border-primary/50 bg-card/50 hover:bg-card transition-all duration-200 hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-muted-foreground text-sm font-medium">
                    {post.date}
                  </span>
                  <span className="text-muted-foreground/50">•</span>
                  <span className="text-muted-foreground text-sm">
                    {post.readTime}
                  </span>
                </div>
                <CardTitle className="group-hover:text-primary text-2xl transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-base leading-relaxed">
                  {post.description}
                </CardDescription>
                <div className="mt-auto flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs font-medium">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
