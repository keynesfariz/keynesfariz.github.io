import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  BriefcaseIcon,
  GraduationCapIcon,
  LanguagesIcon,
  MapPinIcon,
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <section className="flex flex-col items-start gap-8 md:flex-row md:items-center">
        <Avatar className="border-border size-24 border-2 sm:size-32">
          <AvatarImage src="/placeholder-avatar.png" alt="Profile" />
          <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
            FR
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Hi, I'm Fariz 👋
          </h1>
          <h2 className="text-muted-foreground text-xl font-medium md:text-2xl">
            Software Engineer at{' '}
            <span className="text-foreground font-semibold">Acme Corp</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            I'm a software engineer specializing in building (and occasionally
            designing) exceptional digital experiences. Currently, I'm focused
            on building accessible, human-centered products at Acme Corp.
          </p>
          <div className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
            <MapPinIcon className="size-4" />
            <span>Jakarta, Indonesia</span>
          </div>
        </div>
      </section>

      <Separator />

      {/* Experience, Education & Languages */}
      <section className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          {/* Work Experience */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <BriefcaseIcon className="text-primary size-5" />
              <h3 className="text-xl font-bold">Experience</h3>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <div className="mb-1 flex items-baseline justify-between">
                  <h4 className="text-base font-semibold">Software Engineer</h4>
                  <span className="text-muted-foreground text-sm">
                    2022 - Present
                  </span>
                </div>
                <div className="text-muted-foreground mb-2 text-sm font-medium">
                  Acme Corp
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Led the frontend development team in re-architecting the core
                  product dashboard using Next.js and React.
                </p>
              </div>
              <div className="mt-2 flex flex-col">
                <div className="mb-1 flex items-baseline justify-between">
                  <h4 className="text-base font-semibold">
                    Frontend Developer
                  </h4>
                  <span className="text-muted-foreground text-sm">
                    2020 - 2022
                  </span>
                </div>
                <div className="text-muted-foreground mb-2 text-sm font-medium">
                  Tech Solutions Inc.
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Developed and maintained multiple client-facing web
                  applications using React and Tailwind CSS.
                </p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mt-2 md:mt-6">
            <div className="mb-4 flex items-center gap-2">
              <GraduationCapIcon className="text-primary size-5" />
              <h3 className="text-xl font-bold">Education</h3>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <div className="mb-1 flex items-baseline justify-between">
                  <h4 className="text-base font-semibold">
                    B.S. Computer Science
                  </h4>
                  <span className="text-muted-foreground text-sm">
                    2016 - 2020
                  </span>
                </div>
                <div className="text-muted-foreground text-sm font-medium">
                  University of Example
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Languages */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <LanguagesIcon className="text-primary size-5" />
              <h3 className="text-xl font-bold">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Indonesian (Native)</Badge>
              <Badge variant="secondary">English (Fluent)</Badge>
              <Badge variant="outline">Japanese (Basic)</Badge>
            </div>
          </div>

          {/* Stack / Skills */}
          <div className="text-muted-foreground bg-muted/50 border-border/50 mt-2 rounded-lg border p-4 text-sm">
            <h4 className="text-foreground mb-2 font-semibold">Stack</h4>
            <p>React, Next.js, TypeScript, Tailwind CSS, Node.js, PostgreSQL</p>
          </div>
        </div>
      </section>

      <Separator />

      {/* Recent Posts */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold tracking-tight">Recent Posts</h3>
          <Link
            href="/posts"
            className="text-primary text-sm font-medium underline-offset-4 hover:underline">
            View all posts &rarr;
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((post) => (
            <Link
              key={post}
              href={`/posts/mock-post-${post}`}
              className="group h-full">
              <Card className="hover:border-primary/50 bg-card/50 hover:bg-card flex h-full flex-col transition-all duration-200 hover:shadow-md">
                <CardHeader>
                  <div className="text-muted-foreground mb-2 text-xs">
                    Oct 24, 2024 • 5 min read
                  </div>
                  <CardTitle className="group-hover:text-primary line-clamp-2 text-lg transition-colors">
                    Understanding React Server Components in Next.js 14
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="line-clamp-3">
                    A deep dive into how Server Components change the way we
                    think about building React applications and managing state
                    across the network boundary.
                  </CardDescription>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs font-normal">
                      React
                    </Badge>
                    <Badge variant="outline" className="text-xs font-normal">
                      Next.js
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
