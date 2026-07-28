'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  MessageSquareDashed,
  MessageSquareDot,
  PlusCircle,
} from 'lucide-react';

import { useAiConversations } from '@/hooks/chat';
import { cn } from '@/lib/utils';

type Conversation = {
  id: string;
  topic?: string;
  expires_at?: string;
};

function ChatLeftSidebarContent() {
  const searchParams = useSearchParams();
  const id = searchParams?.get('id') || undefined;

  const { data: chatData, isLoading: chatLoading } = useAiConversations();

  return (
    <div className="flex flex-col gap-2 w-full max-w-75">
      <h3 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
        Recent Chats
      </h3>
      <Link
        href="/chat"
        className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
        <PlusCircle className="h-4 w-4" />
        New Chat
      </Link>
      <div className="mt-2 flex flex-col gap-1">
        {chatLoading ? (
          <div className="text-muted-foreground px-2 text-sm">Loading...</div>
        ) : chatData?.length === 0 ? (
          <div className="text-muted-foreground px-2 text-sm">No chats yet</div>
        ) : (
          chatData?.map((conv: Conversation) => {
            const isExpired = conv.expires_at
              ? new Date(conv.expires_at) < new Date()
              : false;
            const Icon = isExpired ? MessageSquareDashed : MessageSquareDot;

            return (
              <Link
                key={conv.id}
                href={`/chat?id=${conv.id}`}
                className={cn(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                  id === conv.id
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground',
                )}>
                <Icon
                  className={cn(
                    'h-4 w-4 shrink-0',
                    !isExpired ? 'text-primary' : '',
                  )}
                />
                <span className="truncate">{conv.topic || 'New Chat'}</span>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

export default function LeftSidebarPage() {
  return (
    <Suspense fallback={<div className="text-sm text-muted-foreground">Loading...</div>}>
      <ChatLeftSidebarContent />
    </Suspense>
  );
}
