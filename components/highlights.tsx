import { LucideProps } from 'lucide-react';
import React from 'react';

interface HighlightProps {
  icon: React.ComponentType<LucideProps>;
  title: string;
  children: React.ReactNode;
}

export const Highlight = ({ icon: Icon, title, children }: HighlightProps) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <Icon className="text-primary size-5" />
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    {children}
  </div>
);

interface HighlightItemProps {
  title: string;
  organisation: string;
  date: string;
  summary?: string;
}

export const HighlightItem = ({
  title,
  organisation,
  date,
  summary,
}: HighlightItemProps) => (
  <div className="flex flex-col">
    <div className="mb-1 flex items-baseline justify-between">
      <h4 className="text-base font-semibold">{title}</h4>
      <span className="text-muted-foreground text-sm">{date}</span>
    </div>
    <div className="text-muted-foreground mb-2 text-sm font-medium">
      {organisation}
    </div>
    {summary && (
      <p
        title={summary}
        className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
        {summary}
      </p>
    )}
  </div>
);
