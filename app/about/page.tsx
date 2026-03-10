import { Card } from '@/components/ui/card';

export default function About() {
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

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Git Contributions</h2>
        <Card className="border-border bg-card/50 overflow-x-auto p-4">
          <div className="min-w-[700px]">
            <div className="text-muted-foreground mb-2 flex justify-between px-2 text-xs">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
            <div className="grid w-full grid-flow-col grid-rows-7 gap-1 text-xs">
              {/* Mock Git contribution squares. We generate ~50 cols * 7 rows = 350 squares roughly representing a year. */}
              {Array.from({ length: 350 }).map((_, i) => {
                // Randomly generate colors to mock github contributions
                const val = Math.random();
                let colorClass = 'bg-muted/30';
                if (val > 0.9) colorClass = 'bg-primary';
                else if (val > 0.7) colorClass = 'bg-primary/70';
                else if (val > 0.5) colorClass = 'bg-primary/40';
                else if (val > 0.3) colorClass = 'bg-primary/20';

                return (
                  <div
                    key={i}
                    className={`size-3 rounded-sm ${colorClass} hover:ring-ring transition-all hover:ring-1`}
                    title={`Mock contribution ${i}`}
                  />
                );
              })}
            </div>
            <div className="text-muted-foreground mt-4 flex items-center justify-end gap-2 text-xs">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="bg-muted/30 size-3 rounded-sm" />
                <div className="bg-primary/20 size-3 rounded-sm" />
                <div className="bg-primary/40 size-3 rounded-sm" />
                <div className="bg-primary/70 size-3 rounded-sm" />
                <div className="bg-primary size-3 rounded-sm" />
              </div>
              <span>More</span>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
