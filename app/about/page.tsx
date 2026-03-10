import { Card } from '@/components/ui/card';

export default function About() {
    return (
        <div className="flex flex-col gap-12 max-w-2xl">
            <section className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
                <div className="text-lg text-muted-foreground leading-relaxed flex flex-col gap-4 mt-2">
                    <p>
                        Hello! I'm Fariz, a software engineer with a passion for building robust, scalable applications and beautiful user interfaces. I love combining the technical challenges of backend engineering with the aesthetic considerations of frontend development.
                    </p>
                    <p>
                        When I'm not writing code, you can find me reading about new technologies, exploring open-source projects, or taking photos around the city. I believe in continuous learning and always strive to improve my craft.
                    </p>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold tracking-tight">Git Contributions</h2>
                <Card className="p-4 overflow-x-auto border-border bg-card/50">
                    <div className="min-w-[700px]">
                        <div className="flex justify-between text-xs text-muted-foreground mb-2 px-2">
                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                        </div>
                        <div className="grid grid-rows-7 grid-flow-col gap-1 w-full text-xs">
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
                                        className={`h-3 w-3 rounded-sm ${colorClass} hover:ring-1 hover:ring-ring transition-all`}
                                        title={`Mock contribution ${i}`}
                                    />
                                );
                            })}
                        </div>
                        <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
                            <span>Less</span>
                            <div className="flex gap-1">
                                <div className="h-3 w-3 rounded-sm bg-muted/30" />
                                <div className="h-3 w-3 rounded-sm bg-primary/20" />
                                <div className="h-3 w-3 rounded-sm bg-primary/40" />
                                <div className="h-3 w-3 rounded-sm bg-primary/70" />
                                <div className="h-3 w-3 rounded-sm bg-primary" />
                            </div>
                            <span>More</span>
                        </div>
                    </div>
                </Card>
            </section>
        </div>
    );
}
