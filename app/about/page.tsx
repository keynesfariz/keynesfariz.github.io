import { MainLayout } from '@/components/layout/main-layout';
import { getGitContributions } from '@/lib/github.server';
import { DateTime } from '@/components/ui/datetime';
import GitContributions from './git-contributions';
import aboutData from '@/data/about.json';
import { getMetadata } from '@/lib/seo';

export function generateMetadata() {
  return getMetadata({ title: 'About Me' });
}

export default async function About() {
  const contributions = await getGitContributions();

  return (
    <MainLayout>
      <div className="flex flex-col gap-12">
        <section className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
          <div className="text-muted-foreground mt-2 flex flex-col gap-6 text-lg leading-relaxed">
            {aboutData.intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <h3 className="text-foreground mt-4 text-2xl font-bold tracking-tight">
              Beyond the Screen
            </h3>
            {aboutData.beyond_the_screen.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>

        {contributions && (
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Git Contributions
            </h2>
            <GitContributions contributions={contributions.contributions} />
            <div className="text-muted-foreground text-right text-xs">
              <span>Last updated: </span>
              <DateTime dateTime={contributions.updated_at} />
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
}
