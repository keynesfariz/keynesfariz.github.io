import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { API_URL } from '@/lib/env';
import { Message } from './types';

async function processChatStream(
  response: Response,
  queryClient: QueryClient,
  router: ReturnType<typeof useRouter>,
  assistantMessageId: string,
  initialConversationId: string | null | undefined,
) {
  if (!response.body) throw new Error('No response body');

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let done = false;
  let buffer = '';
  let currentConversationId = initialConversationId;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;
    if (value) {
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n\n');
      buffer = lines.pop() || '';

      for (const chunk of lines) {
        const dataLines = chunk.split('\n');
        for (const line of dataLines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6);
            if (dataStr.trim() === '[DONE]') break;

            let data;
            try {
              data = JSON.parse(dataStr);
            } catch {
              // Ignore JSON parse errors for incomplete chunks
              continue;
            }

            // Handle errors from backend
            if (data.error) {
              throw new Error(data.error);
            }

            // Handle new conversation ID from backend
            if (data.conversation_id && !currentConversationId) {
              currentConversationId = data.conversation_id;

              // Move temporary cache to actual conversation cache
              const tempData = queryClient.getQueryData([
                'conversation',
                undefined,
              ]) as { messages: Message[]; expiresAt: string | null };
              if (tempData) {
                queryClient.setQueryData(
                  ['conversation', currentConversationId],
                  tempData,
                );
                queryClient.setQueryData(['conversation', undefined], {
                  messages: [],
                  expiresAt: null,
                });
              }

              router.push(`/chat?id=${currentConversationId}`);
              queryClient.invalidateQueries({ queryKey: ['conversations'] });
            }

            // Append text to assistant message in cache
            if (data.text) {
              const targetId = currentConversationId || undefined;
              queryClient.setQueryData(
                ['conversation', targetId],
                (
                  old:
                    | { messages: Message[]; expiresAt: string | null }
                    | undefined,
                ) => {
                  if (!old) return old;
                  return {
                    ...old,
                    messages: old.messages.map((msg) =>
                      msg.id === assistantMessageId
                        ? { ...msg, content: msg.content + data.text }
                        : msg,
                    ),
                  };
                },
              );
            }
          }
        }
      }
    }
  }

  return currentConversationId;
}

function setupOptimisticCache(
  queryClient: QueryClient,
  conversationId: string | null | undefined,
  userMessage: Message,
  assistantMessage: Message,
) {
  const targetId = conversationId || undefined;
  queryClient.setQueryData(
    ['conversation', targetId],
    (old: { messages: Message[]; expiresAt: string | null } | undefined) => {
      const messages = old?.messages || [];
      return {
        messages: [...messages, userMessage, assistantMessage],
        expiresAt: old?.expiresAt || null,
      };
    },
  );
}

export function useAiChatMutation(conversationId?: string | null) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const abortControllerRef = useRef<AbortController | null>(null);

  const mutation = useMutation({
    mutationFn: async (messageContent: string) => {
      const userMessageId = Math.random().toString();
      const assistantMessageId = Math.random().toString();

      const userMessage: Message = {
        id: userMessageId,
        role: 'user',
        content: messageContent,
      };
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
      };

      setupOptimisticCache(
        queryClient,
        conversationId,
        userMessage,
        assistantMessage,
      );

      const controller = new AbortController();
      abortControllerRef.current = controller;

      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageContent,
          conversation_id: conversationId,
        }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error('Network error');

      const finalConversationId = await processChatStream(
        res,
        queryClient,
        router,
        assistantMessageId,
        conversationId,
      );

      return { conversationId: finalConversationId };
    },
    onSettled: (data) => {
      abortControllerRef.current = null;
      if (data?.conversationId) {
        queryClient.invalidateQueries({
          queryKey: ['conversation', data.conversationId],
        });
      }
    },
    onError: (error) => {
      if (error.name !== 'AbortError') {
        const targetId = conversationId || undefined;
        queryClient.setQueryData(
          ['conversation', targetId],
          (
            old: { messages: Message[]; expiresAt: string | null } | undefined,
          ) => {
            if (!old) return old;
            return {
              ...old,
              messages: [
                ...old.messages,
                {
                  id: Math.random().toString(),
                  role: 'assistant',
                  content: 'An error occurred. Please try again.',
                },
              ],
            };
          },
        );
      }
    },
  });

  return {
    sendMessage: mutation.mutate,
    isLoading: mutation.isPending,
    stop: () => abortControllerRef.current?.abort(),
  };
}
