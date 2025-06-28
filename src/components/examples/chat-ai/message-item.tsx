import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Avatar } from 'react-native-paper';
import MarkdownComponent from './markdown-component';
import { MessageItemProps, ColorPalette } from './types';

const MessageItem = memo(({ message }: MessageItemProps) => {
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
          color="white"
          style={styles.aiAvatar}
        />
      )}
      <Surface
        style={[
          styles.messageBubble,
          message.role === 'assistant'
            ? styles.assistantBubble
            : styles.userBubble
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
  aiAvatar: {
    backgroundColor: ColorPalette.seaBlueMedium,
    marginRight: 8,
  },
  messageBubble: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxWidth: '100%',
  },
  assistantBubble: {
    backgroundColor: '#F5F5F5',
  },
  userBubble: {
    backgroundColor: ColorPalette.seaBlueLight,
  },
});
