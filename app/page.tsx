import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BriefcaseIcon, GraduationCapIcon, LanguagesIcon, MapPinIcon } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row gap-8 items-start md:items-center">
        <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-border">
          <AvatarImage src="/placeholder-avatar.png" alt="Profile" />
          <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">FR</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Hi, I'm Fariz 👋
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
            Software Engineer at <span className="text-foreground font-semibold">Acme Corp</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            I'm a software engineer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products at Acme Corp.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <MapPinIcon className="w-4 h-4" />
            <span>Jakarta, Indonesia</span>
          </div>
        </div>
      </section>

      <Separator />

      {/* Experience, Education & Languages */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BriefcaseIcon className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Experience</h3>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-semibold text-base">Software Engineer</h4>
                  <span className="text-sm text-muted-foreground">2022 - Present</span>
                </div>
                <div className="text-sm font-medium text-muted-foreground mb-2">Acme Corp</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Led the frontend development team in re-architecting the core product dashboard using Next.js and React.
                </p>
              </div>
              <div className="flex flex-col mt-2">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-semibold text-base">Frontend Developer</h4>
                  <span className="text-sm text-muted-foreground">2020 - 2022</span>
                </div>
                <div className="text-sm font-medium text-muted-foreground mb-2">Tech Solutions Inc.</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Developed and maintained multiple client-facing web applications using React and Tailwind CSS.
                </p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mt-2 md:mt-6">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCapIcon className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Education</h3>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-semibold text-base">B.S. Computer Science</h4>
                  <span className="text-sm text-muted-foreground">2016 - 2020</span>
                </div>
                <div className="text-sm font-medium text-muted-foreground">University of Example</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Languages */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <LanguagesIcon className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Indonesian (Native)</Badge>
              <Badge variant="secondary">English (Fluent)</Badge>
              <Badge variant="outline">Japanese (Basic)</Badge>
            </div>
          </div>

          {/* Stack / Skills */}
          <div className="mt-2 text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg border border-border/50">
            <h4 className="font-semibold text-foreground mb-2">Stack</h4>
            <p>React, Next.js, TypeScript, Tailwind CSS, Node.js, PostgreSQL</p>
          </div>
        </div>
      </section>

      <Separator />

      {/* Recent Posts */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold tracking-tight">Recent Posts</h3>
          <Link href="/posts" className="text-sm font-medium text-primary hover:underline underline-offset-4">
            View all posts &rarr;
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((post) => (
            <Link key={post} href={`/posts/mock-post-${post}`} className="group h-full">
              <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-md hover:border-primary/50 bg-card/50 hover:bg-card">
                <CardHeader>
                  <div className="text-xs text-muted-foreground mb-2">Oct 24, 2024 • 5 min read</div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                    Understanding React Server Components in Next.js 14
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="line-clamp-3">
                    A deep dive into how Server Components change the way we think about building React applications and managing state across the network boundary.
                  </CardDescription>
                  <div className="flex gap-2 mt-4 flex-wrap">
                    <Badge variant="outline" className="text-xs font-normal">React</Badge>
                    <Badge variant="outline" className="text-xs font-normal">Next.js</Badge>
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
