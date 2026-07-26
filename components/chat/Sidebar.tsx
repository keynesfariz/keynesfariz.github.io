'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { PlusCircle, MessageSquare } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

type Conversation = {
  id: string;
  topic?: string;
};

export function Sidebar() {
  const searchParams = useSearchParams();
  const id = searchParams?.get('id') || undefined;
  
  const { data, isLoading } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/conversations`);
      if (!res.ok) throw new Error('Failed to fetch conversations');
      const data = await res.json();
      return data.conversations || [];
    }
  });

  return (
    <div className="flex w-64 flex-col border-r border-border/50 bg-muted/20 p-4">
      <Link
        href="/chat"
        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <PlusCircle className="h-4 w-4" />
        New Chat
      </Link>
      <div className="mt-6 flex-1 overflow-y-auto">
        <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Recent
        </h3>
        {isLoading ? (
          <div className="px-2 text-sm text-muted-foreground">Loading...</div>
        ) : data?.length === 0 ? (
          <div className="px-2 text-sm text-muted-foreground">No chats yet</div>
        ) : (
          <div className="flex flex-col gap-1">
            {data?.map((conv: Conversation) => (
              <Link
                key={conv.id}
                href={`/chat?id=${conv.id}`}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  id === conv.id 
                    ? "bg-secondary text-secondary-foreground" 
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                <MessageSquare className="h-4 w-4 shrink-0" />
                <span className="truncate">{conv.topic || 'New Chat'}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
