'use client';

import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';

import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  sendMessage: (msg: string) => void;
  isLoading: boolean;
}

export function ChatInput({ sendMessage, isLoading }: ChatInputProps) {
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
    <form
      onSubmit={onSubmit}
      className="border-border/50 bg-background focus-within:ring-primary relative flex w-full items-end gap-2 rounded-2xl border p-2 shadow-sm focus-within:ring-1">
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask Farsisstant anything..."
        className="min-h-11 w-full resize-none border-0 bg-transparent py-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        rows={1}
      />
      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        className="bg-primary text-primary-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-opacity disabled:opacity-50">
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
