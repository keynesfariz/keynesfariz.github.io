'use client';

import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';

import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  sendMessage: (msg: string) => void;
  isLoading: boolean;
  botName?: string;
}

export function ChatInput({
  sendMessage,
  isLoading,
  botName = 'Farsisstant',
}: ChatInputProps) {
  const [input, setInput] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Send the message
    sendMessage(input);
    setInput('');

    // Reset textarea height after submit
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Use native form submission event
      const form = e.currentTarget.form;
      if (form) form.requestSubmit();
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={`Ask ${botName} anything...`}
        className="min-h-11 w-full resize-none py-3 focus-visible:ring-1"
        rows={1}
      />
      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        className="bg-primary text-primary-foreground flex size-11 shrink-0 items-center justify-center rounded-xl transition-opacity disabled:opacity-50">
        <Send className="size-5" />
      </button>
    </form>
  );
}
