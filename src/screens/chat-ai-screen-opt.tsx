import React, { lazy, Suspense } from 'react';
import NotFoundScreen from './not-found-screen';

// Create a safe lazy loader that catches import errors at runtime
const ChatScreen = lazy(() =>
  import('md-chat-ai-screen').catch(() => ({
    default: () => <NotFoundScreen moduleName="md-chat-ai-screen" />,
  }))
);

export default function ChatScreenOpt() {
  return (
    <Suspense fallback={<NotFoundScreen moduleName="md-chat-ai-screen" />}>
      <ChatScreen />
    </Suspense>
  );
}
