import { QueryProvider } from '@/components/query-provider';
import { Sidebar } from '@/components/chat/Sidebar';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <div className="flex h-[calc(100vh-8rem)] w-full overflow-hidden rounded-xl border border-border/50 bg-background/50 shadow-sm">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </QueryProvider>
  );
}
