'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { BedDouble, Bot } from 'lucide-react';

import {
  useAiChatMutation,
  useAiConversationMessages,
  useAiHealth,
  useAiSystemInfo,
  useConversationExpiration,
} from '@/hooks/chat';
import { Button } from '@/components/ui/button';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { cn } from '@/lib/utils';

function ChatLandingPage({
  sendMessage,
  isChatLoading,
  systemInfo,
  isWakingUp,
  hasFailed,
}: {
  sendMessage: (msg: string) => void;
  isChatLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  systemInfo: any;
  isWakingUp: boolean;
  hasFailed: boolean;
}) {
  const botName = systemInfo?.bot_name || 'Farsisstant';
  const ownerName = systemInfo?.owner_name || 'Fariz';

  const exampleQuestions = [
    `What is ${ownerName}'s tech stack?`,
    'Tell me about his RAG chatbot project',
  ];

  return (
    <div className="flex h-full flex-col items-center justify-end p-4 md:p-8">
      <div className="flex max-w-2xl flex-col items-center gap-8 text-center">
        <div className="bg-primary/10 text-primary flex size-20 items-center justify-center rounded-2xl">
          {isWakingUp || hasFailed ? (
            <BedDouble
              className={cn('size-10', isWakingUp ? 'animate-pulse' : '')}
            />
          ) : (
            <Bot className="size-10" />
          )}
        </div>

        <div className={cn('space-y-2', isWakingUp ? 'animate-pulse' : '')}>
          <h1 className="text-3xl font-bold tracking-tight">{botName}</h1>
          <p className="text-muted-foreground">
            {hasFailed
              ? `${botName} is currently unavailable. Please try again later.`
              : isWakingUp
                ? `${botName} is waking up right now... Hang tight!`
                : `Your AI assistant for everything about ${ownerName}. Ask me about his projects, skills, or experience!`}
          </p>
        </div>

        <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm">
          {exampleQuestions.map((question) => (
            <Button
              key={question}
              variant="outline"
              className="cursor-pointer"
              onClick={() => sendMessage(question)}>
              {question}
            </Button>
          ))}
        </div>

        <div className="w-full max-w-xl">
          <ChatInput
            sendMessage={sendMessage}
            isLoading={isChatLoading || isWakingUp || hasFailed}
            botName={botName}
          />
        </div>
      </div>
    </div>
  );
}

function ConversationView({
  conversationId,
  sendMessage,
  isChatLoading,
  systemInfo,
  isWakingUp,
  hasFailed,
}: {
  conversationId: string | undefined;
  sendMessage: (msg: string) => void;
  isChatLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  systemInfo: any;
  isWakingUp: boolean;
  hasFailed: boolean;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data } = useAiConversationMessages(conversationId);
  const { isExpired } = useConversationExpiration(data?.expiresAt);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data?.messages]);

  return (
    <div className="flex h-full flex-col">
      <div className="grow overflow-y-auto p-4 md:p-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-2">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(data?.messages || []).map((message: any) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
              createdAt={message.created_at || message.createdAt}
              isLoading={
                isChatLoading &&
                message.role === 'assistant' &&
                message.content === ''
              }
            />
          ))}
          {isExpired && (
            <div className="text-muted-foreground mt-4 text-center text-sm italic">
              I&apos;ve closed this session, but we can always start a new one.
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {!isExpired && (
        <div className="bg-background/95 supports-backdrop-filter:bg-background/60 p-4 backdrop-blur">
          <div className="mx-auto max-w-3xl">
            <ChatInput
              sendMessage={sendMessage}
              isLoading={isChatLoading || isWakingUp || hasFailed}
              botName={systemInfo?.bot_name || 'Farsisstant'}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ChatContent() {
  const searchParams = useSearchParams();
  const conversationId = searchParams?.get('id') || undefined;

  const { data: systemInfo } = useAiSystemInfo();
  const { isWakingUp, hasFailed } = useAiHealth();
  const { sendMessage, isLoading: isChatLoading } =
    useAiChatMutation(conversationId);
  const { data: optimisticData } = useAiConversationMessages(undefined);

  const hasOptimisticMessages =
    !conversationId &&
    optimisticData?.messages &&
    optimisticData.messages.length > 0;

  const botName = systemInfo?.bot_name || 'Farsisstant';

  return (
    <div className="flex h-full flex-col">
      {isWakingUp && (
        <div className="bg-yellow-100 p-2 text-center text-sm font-medium text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200">
          Backend is currently sleeping, waking it up...
        </div>
      )}
      {hasFailed && (
        <div className="bg-red-100 p-2 text-center text-sm font-medium text-red-800 dark:bg-red-900/50 dark:text-red-200">
          {botName} isn&apos;t waking up, please try again later.
        </div>
      )}
      <div className="grow overflow-hidden">
        {conversationId || hasOptimisticMessages ? (
          <ConversationView
            conversationId={conversationId}
            sendMessage={sendMessage}
            isChatLoading={isChatLoading}
            systemInfo={systemInfo}
            isWakingUp={isWakingUp}
            hasFailed={hasFailed}
          />
        ) : (
          <ChatLandingPage
            sendMessage={sendMessage}
            isChatLoading={isChatLoading}
            systemInfo={systemInfo}
            isWakingUp={isWakingUp}
            hasFailed={hasFailed}
          />
        )}
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center p-8">
          Loading...
        </div>
      }>
      <ChatContent />
    </Suspense>
  );
}
