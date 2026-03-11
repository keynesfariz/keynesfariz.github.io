import { Highlight, HighlightItem } from '@/components/highlights';
import Skills from '@/components/skill';
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
import { getResumeSchema } from '@/lib/data';
import { getHomepageData } from '@/lib/transformers';
import dayjs from 'dayjs';
import {
  BriefcaseIcon,
  GraduationCapIcon,
  LanguagesIcon,
  MapPinIcon,
} from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const resume = await getResumeSchema(process.env.JSONRESUME_GIST_ID ?? '');
  const profile = getHomepageData(resume);

  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <section className="flex flex-col items-start gap-8 md:flex-row md:items-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Hi, I'm Fariz 👋
          </h1>
          <h2 className="text-muted-foreground text-xl font-medium md:text-2xl">
            {profile.title}
            {profile.company && (
              <>
                {' @ '}
                <span className="text-foreground font-semibold">
                  {profile.company}
                </span>
              </>
            )}
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            I'm a software engineer specializing in building (and occasionally
            designing) exceptional digital experiences. Currently, I'm focused
            on building accessible, human-centered products at Acme Corp.
          </p>
          {profile.location && (
            <div className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
              <MapPinIcon className="size-4" />
              <span>{profile.location}</span>
            </div>
          )}
        </div>
        <Avatar className="border-border size-32 border-2 sm:size-40">
          <AvatarImage
            src={process.env.PROFILE_PHOTO_URL}
            alt="Headshot of Fariz"
          />
          <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
            FM
          </AvatarFallback>
        </Avatar>
      </section>

      <Separator />

      {/* Experience, Education & Languages */}
      <section className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col gap-8">
          {/* Work Experience */}
          <Highlight icon={BriefcaseIcon} title="Experience">
            <div className="flex flex-col gap-6">
              {profile.work?.map((work) => (
                <HighlightItem
                  key={work.name}
                  title={work.position ?? ''}
                  organisation={work.name ?? ''}
                  date={work.date}
                  summary={work.summary}
                />
              ))}
            </div>
          </Highlight>

          {/* Education */}
          <Highlight icon={GraduationCapIcon} title="Education">
            <div className="flex flex-col gap-6">
              {profile.education?.map((education) => {
                const title = `${education.studyType ?? ''} of ${education.area ?? ''}`;
                return (
                  <HighlightItem
                    key={title}
                    title={title}
                    organisation={education.institution ?? ''}
                    date={
                      education.endDate
                        ? dayjs(education.endDate).format('YYYY')
                        : ''
                    }
                  />
                );
              })}
            </div>
          </Highlight>
        </div>

        <div className="flex flex-col gap-8">
          {/* Stack / Skills */}
          {profile.skills?.length && (
            <Highlight icon={LanguagesIcon} title="Stack / Skills">
              <Skills skills={profile.skills} />
            </Highlight>
          )}

          {/* Languages */}
          {profile.languages?.length && (
            <Highlight icon={LanguagesIcon} title="Languages">
              <div className="flex flex-wrap gap-2">
                {profile.languages.map((lang) => (
                  <Badge
                    key={lang.language}
                    variant={
                      ['native', 'fluent', 'intermediate', 'advanced'].includes(
                        lang.fluency ? lang.fluency.toLowerCase() : '',
                      )
                        ? 'secondary'
                        : 'outline'
                    }>
                    {lang.language} ({lang.fluency})
                  </Badge>
                ))}
              </div>
            </Highlight>
          )}
          {/* <div>
            <div className="mb-4 flex items-center gap-2">
              <LanguagesIcon className="text-primary size-5" />
              <h3 className="text-xl font-bold">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Indonesian (Native)</Badge>
              <Badge variant="secondary">English (Fluent)</Badge>
              <Badge variant="outline">Japanese (Basic)</Badge>
            </div>
          </div> */}

          {/* <div className="text-muted-foreground bg-muted/50 border-border/50 mt-2 rounded-lg border p-4 text-sm">
            <h4 className="text-foreground mb-2 font-semibold">Stack</h4>
            <p>React, Next.js, TypeScript, Tailwind CSS, Node.js, PostgreSQL</p>
          </div>  */}
        </div>
      </section>

      <Separator />

      {/* Recent Writings */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold tracking-tight">Recent writings</h3>
          <Link
            href="/writings"
            className="text-primary text-sm font-medium underline-offset-4 hover:underline">
            View all writings &rarr;
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2].map((post) => (
            <Link
              key={post}
              href={`/writings/mock-post-${post}`}
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
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
