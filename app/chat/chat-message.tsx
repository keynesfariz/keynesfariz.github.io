'use client';

import { Bot, User } from 'lucide-react';

import { Markdown } from '@/components/ui/markdown';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system' | 'data';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  if (role === 'system' || role === 'data') return null;

  return (
    <div
      className={cn(
        'flex w-full py-4',
        isUser ? 'justify-end' : 'justify-start',
      )}>
      <div
        className={cn(
          'flex max-w-[80%] gap-4',
          isUser ? 'flex-row-reverse' : 'flex-row',
        )}>
        <div
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
            isUser ? 'bg-primary text-white' : 'bg-muted text-muted-foreground',
          )}>
          {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
        </div>
        <div
          className={cn(
            'flex flex-col gap-2 overflow-hidden rounded-2xl px-4 py-3 text-sm',
            isUser ? 'bg-primary text-white' : 'bg-muted/50 prose prose-sm',
          )}>
          {isUser ? (
            <div className="whitespace-pre-wrap">{content}</div>
          ) : (
            <div className="prose prose-sm prose-neutral dark:prose-invert">
              <Markdown content={content} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
