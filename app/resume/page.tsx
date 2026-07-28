import {
  AtomIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  LanguagesIcon,
} from 'lucide-react';

import { MainLayout } from '@/components/layout/main-layout';
import { Highlight, HighlightItem } from './highlights';
import { getResumeSchema } from '@/lib/github.server';
import { formatYear } from '@/lib/date-format';
import { getHomepageData } from '@/lib/resume';
import { Badge } from '@/components/ui/badge';
import { getMetadata } from '@/lib/seo';
import Skills from './skill';

export function generateMetadata() {
  return getMetadata({ title: 'History' });
}

export default async function Resume() {
  const resume = await getResumeSchema();
  const profile = getHomepageData(resume);

  return (
    <MainLayout>
      <div className="flex flex-col gap-12">
        <section className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight">History</h1>
          <p className="text-muted-foreground text-lg">
            Timeline of my professional background, education, and technical
            skills.
          </p>
        </section>

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
                    date={
                      education.endDate ? formatYear(education.endDate) : ''
                    }
                  />
                );
              })}
            </div>
          </Highlight>

          {/* Stack / Skills */}
          {profile.skills && profile.skills.length > 0 && (
            <Highlight
              title="Stack / Skills"
              icon={AtomIcon}
              className="md:order-2">
              <Skills skills={profile.skills} />
            </Highlight>
          )}

          {/* Languages */}
          {profile.languages && profile.languages.length > 0 && (
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
      </div>
    </MainLayout>
  );
}
