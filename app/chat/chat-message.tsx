'use client';

import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';
import { Bot, User } from 'lucide-react';

import { Markdown } from '@/components/ui/markdown';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system' | 'data';
  content: string;
  createdAt?: string;
  isLoading?: boolean;
}

export function ChatMessage({
  role,
  content,
  createdAt,
  isLoading,
}: ChatMessageProps) {
  const isUser = role === 'user';

  const [streamedContent, setStreamedContent] = useState(content);
  const [isStreamingMessage] = useState(content === '');

  useEffect(() => {
    if (role !== 'assistant' || !isStreamingMessage) {
      return;
    }

    const intervalId = setInterval(() => {
      setStreamedContent((prev) => {
        if (prev.length < content.length) {
          const gap = content.length - prev.length;
          const charsToAdd = gap > 100 ? 5 : gap > 50 ? 3 : gap > 20 ? 2 : 1;
          return content.slice(0, prev.length + charsToAdd);
        }
        clearInterval(intervalId);
        return prev;
      });
    }, 15);

    return () => clearInterval(intervalId);
  }, [content, role, isStreamingMessage]);

  const displayedContent =
    role === 'assistant' && isStreamingMessage ? streamedContent : content;

  if (role === 'system' || role === 'data') return null;

  let formattedTime = '';
  if (createdAt) {
    try {
      formattedTime = formatDistanceToNow(new Date(createdAt), {
        addSuffix: true,
      });
    } catch {
      // Ignore invalid date
    }
  }

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
            'mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground',
          )}>
          {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
        </div>
        <div className="flex flex-col gap-1.5">
          <div
            className={cn(
              'flex flex-col gap-2 overflow-hidden rounded-2xl px-4 py-3 text-sm',
              isUser
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/50 prose prose-sm',
            )}>
            {isLoading ? (
              <div className="flex h-5 items-center gap-1 px-1">
                <div className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
                <div className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
                <div className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full"></div>
              </div>
            ) : isUser ? (
              <div className="whitespace-pre-wrap">{displayedContent}</div>
            ) : (
              <div className="prose prose-sm prose-neutral dark:prose-invert">
                <Markdown content={displayedContent} />
              </div>
            )}
          </div>
          {formattedTime && (
            <span
              className={cn(
                'text-muted-foreground px-2 text-xs',
                isUser ? 'text-right' : 'text-left',
              )}>
              {formattedTime}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
