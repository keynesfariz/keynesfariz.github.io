'use client';

import { Suspense } from 'react';
import {
  Zap,
  Database,
  Clock,
} from 'lucide-react';

import { useAiSystemInfo } from '@/hooks/chat';
import { DateTime } from '@/components/ui/datetime';

function ChatSidebarContent() {
  const { data: systemInfo } = useAiSystemInfo();

  return (
    <div className="flex flex-col gap-4 w-full max-w-75">
      <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        System Info
      </h3>
      <div className="flex items-center gap-3 text-sm">
        <Zap className="size-4 shrink-0 text-yellow-500" />
        <div className="flex flex-col">
          <span className="font-medium">Active LLMs</span>
          <span className="text-muted-foreground text-xs">
            {systemInfo?.llm_model || 'Loading...'}
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
              <DateTime
                dateTime={systemInfo.latest_ingestion_date as string}
              />
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
    <Suspense fallback={<div className="text-sm text-muted-foreground">Loading...</div>}>
      <ChatSidebarContent />
    </Suspense>
  );
}
