'use client';

import { Clock, Database, Zap } from 'lucide-react';
import { Suspense } from 'react';

import { DateTime } from '@/components/ui/datetime';
import { useAiSystemInfo } from '@/hooks/chat';

function ChatSidebarContent() {
  const { data: systemInfo } = useAiSystemInfo();

  return (
    <div className="flex w-full max-w-75 flex-col gap-4">
      <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        Stats for Nerds
      </h3>
      <div className="flex items-center gap-3 text-sm">
        <Zap className="size-4 shrink-0 text-yellow-500" />
        <div className="flex flex-col">
          <span className="font-medium">Active LLMs</span>
          <span className="text-muted-foreground text-xs">
            {systemInfo?.llm_model && systemInfo.embedding_model
              ? `${systemInfo?.llm_model} | ${systemInfo.embedding_model}`
              : 'Loading...'}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <Database className="size-4 shrink-0 text-blue-500" />
        <div className="flex flex-col">
          <span className="font-medium">Knowledge Base</span>
          <span className="text-muted-foreground text-xs">
            Updated:{' '}
            {systemInfo?.latest_ingestion_date &&
            systemInfo.latest_ingestion_date !== 'Never' ? (
              <DateTime dateTime={systemInfo.latest_ingestion_date as string} />
            ) : (
              systemInfo?.latest_ingestion_date || 'Loading...'
            )}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <Clock className="size-4 shrink-0 text-green-500" />
        <div className="flex flex-col">
          <span className="font-medium">Session TTL</span>
          <span className="text-muted-foreground text-xs">
            {systemInfo?.session_ttl
              ? Math.round(systemInfo.session_ttl / 60)
              : 1}{' '}
            min
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SidebarPage() {
  return (
    <Suspense
      fallback={
        <div className="text-muted-foreground text-sm">Loading...</div>
      }>
      <ChatSidebarContent />
    </Suspense>
  );
}
