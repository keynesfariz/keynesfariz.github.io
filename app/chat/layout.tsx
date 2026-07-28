import { MainLayout } from '@/components/layout/main-layout';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout className="flex h-[calc(100vh-17.8rem)] grow flex-col py-0! md:h-[calc(100vh-17.8rem)]">
      <div className="border-border/50 bg-background/50 flex w-full grow overflow-hidden rounded-xl border shadow-sm">
        <div className="flex grow flex-col overflow-hidden">{children}</div>
      </div>
    </MainLayout>
  );
}
