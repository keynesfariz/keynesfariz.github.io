import { QueryProvider } from '@/components/providers/query-provider';
import { Sidebar } from './sidebar';
import { MainLayout } from '@/components/layout/main-layout';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <MainLayout className="pt-8!">
        <div className="flex h-[calc(100vh-8rem)] w-full overflow-hidden rounded-xl border border-border/50 bg-background/50 shadow-sm">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            {children}
          </div>
        </div>
      </MainLayout>
    </QueryProvider>
  );
}
