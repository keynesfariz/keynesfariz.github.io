import { QueryProvider } from '@/components/providers/query-provider';
import { MainLayout } from '@/components/layout/main-layout';
import { Sidebar } from './sidebar';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <MainLayout className="max-w-5xl py-0!">
        <div className="border-border/50 bg-background/50 flex h-[calc(100vh-17.8rem)] w-full overflow-hidden rounded-xl border shadow-sm">
          <Sidebar />
          <div className="flex grow flex-col overflow-hidden">{children}</div>
        </div>
      </MainLayout>
    </QueryProvider>
  );
}
