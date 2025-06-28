import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Avatar, useTheme } from 'react-native-paper';
import MarkdownComponent from './markdown-component';
import { MessageItemProps } from './types';

const MessageItem = memo(({ message }: MessageItemProps) => {
  const theme = useTheme();

  return (
    <View
      style={
        message.role === 'assistant' ? styles.aiMessage : styles.userMessage
      }
    >
      {message.role === 'assistant' && (
        <Avatar.Icon
          size={32}
          icon="brain"
          color={theme.colors.onPrimary}
          style={{ backgroundColor: theme.colors.primary, marginRight: 8 }}
        />
      )}
      <Surface
        style={[
          styles.messageBubble,
          message.role === 'assistant'
            ? { backgroundColor: theme.colors.surface }
            : { backgroundColor: theme.colors.primaryContainer }
        ]}
        elevation={1}
      >
        <MarkdownComponent text={message.content} />
      </Surface>
    </View>
  );
});

export default MessageItem;

const styles = StyleSheet.create({
  aiMessage: {
    flexDirection: 'row',
    maxWidth: '85%',
    alignSelf: 'flex-start',
    marginVertical: 8,
    marginLeft: 8,
  },
  userMessage: {
    flexDirection: 'row',
    maxWidth: '85%',
    alignSelf: 'flex-end',
    marginVertical: 8,
    marginRight: 8,
  },
  messageBubble: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxWidth: '100%',
  },
});
