'use client';

import { MessageSquare, PlusCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { useAiConversations } from '@/hooks/chat';
import { cn } from '@/lib/utils';

type Conversation = {
  id: string;
  topic?: string;
};

export function Sidebar() {
  const searchParams = useSearchParams();
  const id = searchParams?.get('id') || undefined;

  const { data, isLoading } = useAiConversations();

  return (
    <div className="border-border/50 bg-muted/20 flex w-64 flex-col border-r p-4">
      <Link
        href="/chat"
        className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
        <PlusCircle className="h-4 w-4" />
        New Chat
      </Link>
      <div className="mt-6 grow overflow-y-auto">
        <h3 className="text-muted-foreground mb-2 px-2 text-xs font-semibold tracking-wider uppercase">
          Recent
        </h3>
        {isLoading ? (
          <div className="text-muted-foreground px-2 text-sm">Loading...</div>
        ) : data?.length === 0 ? (
          <div className="text-muted-foreground px-2 text-sm">No chats yet</div>
        ) : (
          <div className="flex flex-col gap-1">
            {data?.map((conv: Conversation) => (
              <Link
                key={conv.id}
                href={`/chat?id=${conv.id}`}
                className={cn(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                  id === conv.id
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground',
                )}>
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
