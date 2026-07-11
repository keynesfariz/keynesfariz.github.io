import GitContributions from '@/components/git-contributions';
import { getGitContributions, getMetadata } from '@/lib/data';
import { LocalDateTime } from '@/components/local-datetime';

export function generateMetadata() {
  return getMetadata({ title: 'About Me' });
}

export default async function About() {
  const contributions = await getGitContributions();

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
        <div className="text-muted-foreground mt-2 flex flex-col gap-6 text-lg leading-relaxed">
          <p>
            Hi! I&apos;m Fariz. Basically, I&apos;m a builder. I really enjoy
            that 0-to-1 phase where you just take a random idea and turn it into
            a real product that ships. It&apos;s fun because everything is
            possible in the beginning.
          </p>
          <p>
            Even though making a nice frontend UI is satisfying because you can
            see it right away, I&apos;m currently diving deeper into systems
            design. I&apos;m nowhere near a master yet, but I&apos;m constantly
            learning how to build backends that don&apos;t collapse under
            pressure. For me, a good app isn&apos;t just about looking
            pretty—it&apos;s about clean code and fast database queries.
          </p>
          <p>
            Lately, I&apos;ve been spending a lot of time messing with AI and
            LLMs. I&apos;m trying to figure out how to make them do my boring
            tasks for me so my workflow gets faster. Honestly, combining good
            old system design with some AI tools feels like the way to go right
            now.
          </p>

          <h3 className="text-foreground mt-4 text-2xl font-bold tracking-tight">
            Beyond the Screen
          </h3>
          <p>
            Sometimes the best way to solve a bug is to just close the laptop.
            When I&apos;m not coding, I like to try out physical arts.
          </p>
          <p>
            Last year it was mostly photography around the city. Early this year
            I tried painting. And right now I&apos;m getting my hands dirty with
            cross-stitching, needle felting, and making shrinky dinks 😃. There
            is just something nice about making physical things you can actually
            hold, especially since my day job is 100% digital.
          </p>
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
            <LocalDateTime dateTime={contributions.updated_at} />
          </div>
        </section>
      )}
    </div>
  );
}
