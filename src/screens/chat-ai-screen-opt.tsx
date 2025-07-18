import { lazy } from 'react';
import { SuspenseScreen } from '../components/hocs/suspense-screen-hoc';

const ChatScreen = lazy(() => {
  return import('md-chat-ai-screen');
});

export default function ChatScreenOpt() {
  return (
    <SuspenseScreen component={ChatScreen} moduleName="md-chat-ai-screen" />
  );
}
