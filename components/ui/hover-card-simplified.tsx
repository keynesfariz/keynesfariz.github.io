'use client';
import dynamic from 'next/dynamic';

const HoverCard = dynamic(
  () => import('@/components/ui/hover-card').then((mod) => mod.HoverCard),
  { ssr: false },
);
const HoverCardContent = dynamic(
  () =>
    import('@/components/ui/hover-card').then((mod) => mod.HoverCardContent),
  { ssr: false },
);
const HoverCardTrigger = dynamic(
  () =>
    import('@/components/ui/hover-card').then((mod) => mod.HoverCardTrigger),
  { ssr: false },
);

interface HoverProps {
  children: React.ReactElement;
  content: React.ReactNode;
}

export const Hover = ({ children, content }: HoverProps) => (
  <HoverCard>
    <HoverCardTrigger delay={10} closeDelay={100} render={children} />
    <HoverCardContent className="flex w-64 flex-col gap-0.5">
      {content}
    </HoverCardContent>
  </HoverCard>
);
