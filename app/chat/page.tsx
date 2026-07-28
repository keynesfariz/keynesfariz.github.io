'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Bot } from 'lucide-react';

import {
  useAiChatMutation,
  useAiConversationMessages,
  useAiSystemInfo,
  useConversationExpiration,
} from '@/hooks/chat';
import { Button } from '@/components/ui/button';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';

function ChatLandingPage({
  sendMessage,
  isChatLoading,
  systemInfo,
}: {
  sendMessage: (msg: string) => void;
  isChatLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  systemInfo: any;
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
          <Bot className="size-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{botName}</h1>
          <p className="text-muted-foreground">
            Your AI assistant for everything about {ownerName}. Ask me about his
            projects, skills, or experience!
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
            isLoading={isChatLoading}
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
}: {
  conversationId: string | undefined;
  sendMessage: (msg: string) => void;
  isChatLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  systemInfo: any;
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
              isLoading={isChatLoading}
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
  const { sendMessage, isLoading: isChatLoading } =
    useAiChatMutation(conversationId);
  const { data: optimisticData } = useAiConversationMessages(undefined);

  const hasOptimisticMessages =
    !conversationId &&
    optimisticData?.messages &&
    optimisticData.messages.length > 0;

  if (conversationId || hasOptimisticMessages) {
    return (
      <ConversationView
        conversationId={conversationId}
        sendMessage={sendMessage}
        isChatLoading={isChatLoading}
        systemInfo={systemInfo}
      />
    );
  }

  return (
    <ChatLandingPage
      sendMessage={sendMessage}
      isChatLoading={isChatLoading}
      systemInfo={systemInfo}
    />
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
