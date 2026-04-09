import { Writing } from '@/.content-collections/generated';
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
import { getResumeSchema, getWritings } from '@/lib/data';
import { formatDateTime, formatYear } from '@/lib/date-format';
import { getHomepageData } from '@/lib/transformers';
import {
  ArrowRightIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  LanguagesIcon,
  MapPinIcon,
} from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const resume = await getResumeSchema();
  const profile = getHomepageData(resume);

  const featuredWritings = getWritings(undefined, true) as Writing[];

  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <section className="flex flex-col items-start gap-8 md:flex-row md:items-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-4xl font-bold tracking-tight md:text-left md:text-5xl">
            Hi, I&apos;m Fariz 👋
          </h1>
          <h2 className="text-muted-foreground text-center text-xl font-medium md:text-left md:text-2xl">
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
            I&apos;m a software engineer specializing in building (and
            occasionally designing) exceptional digital experiences. Currently,
            I&apos;m focused on building accessible, human-centered products.
          </p>
          {profile.location && (
            <div className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
              <MapPinIcon className="size-4" />
              <span>{profile.location}</span>
            </div>
          )}
        </div>
        <Avatar className="border-border order-first mx-auto size-40 border-2 md:order-last">
          <AvatarImage
            src={process.env.NEXT_PHOTO_URL}
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
        {/* Work Experience */}
        <Highlight
          title="Experience"
          icon={BriefcaseIcon}
          className="order-first">
          <div className="flex flex-col gap-6">
            {profile.work?.map((work) => (
              <HighlightItem
                key={work.name}
                title={work.position ?? ''}
                organisation={work.name ?? ''}
                date={work.date}
              />
            ))}
          </div>
        </Highlight>

        {/* Education */}
        <Highlight
          title="Education"
          icon={GraduationCapIcon}
          className="md:order-3">
          <div className="flex flex-col gap-6">
            {profile.education?.map((education) => {
              const title = `${education.studyType ?? ''} of ${education.area ?? ''}`;
              return (
                <HighlightItem
                  key={title}
                  title={title}
                  organisation={education.institution ?? ''}
                  date={education.endDate ? formatYear(education.endDate) : ''}
                />
              );
            })}
          </div>
        </Highlight>

        {/* Stack / Skills */}
        {profile.skills?.length && (
          <Highlight
            title="Stack / Skills"
            icon={LanguagesIcon}
            className="md:order-2">
            <Skills skills={profile.skills} />
          </Highlight>
        )}

        {/* Languages */}
        {profile.languages?.length && (
          <Highlight
            title="Languages"
            icon={LanguagesIcon}
            className="order-last">
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
      </section>

      {/* Featured Writings */}
      {featuredWritings.length > 0 && (
        <>
          <Separator />
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold tracking-tight">
                Featured Writings
              </h3>
              <Link
                href="/writings"
                className="text-primary flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline">
                View all writings
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {featuredWritings.map((post) => (
                <Link
                  key={post._meta.path}
                  href={`/writings/${post._meta.path}`}
                  className="group h-full">
                  <Card className="hover:border-primary/50 bg-card/50 hover:bg-card flex h-full flex-col transition-all duration-200 hover:shadow-md">
                    <CardHeader>
                      <div className="text-muted-foreground mb-2 text-xs">
                        {formatDateTime(post.created_at)}
                      </div>
                      <CardTitle className="group-hover:text-primary line-clamp-2 text-lg transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    {post.description && (
                      <CardContent className="flex-1">
                        <CardDescription className="line-clamp-3">
                          {post.description}
                        </CardDescription>
                      </CardContent>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
