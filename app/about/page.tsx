import GitContributions from '@/components/git-contributions';
import { getGitContributions } from '@/lib/data';

export default async function About() {
  const contributions = await getGitContributions(
    process.env.GITHUB_USERNAME ?? '',
  );

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
        <div className="text-muted-foreground mt-2 flex flex-col gap-4 text-lg leading-relaxed">
          <p>
            Hello! I'm Fariz, a software engineer with a passion for building
            robust, scalable applications and beautiful user interfaces. I love
            combining the technical challenges of backend engineering with the
            aesthetic considerations of frontend development.
          </p>
          <p>
            When I'm not writing code, you can find me reading about new
            technologies, exploring open-source projects, or taking photos
            around the city. I believe in continuous learning and always strive
            to improve my craft.
          </p>
        </div>
      </section>

      {contributions && (
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Git Contributions
          </h2>
          <GitContributions contributions={contributions.contributions} />
        </section>
      )}
    </div>
  );
}
