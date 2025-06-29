import { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Surface, Avatar, Text, useTheme } from 'react-native-paper';
import AnimatedChatLoading from './animated-chat-loading';
import MessageItem from './message-item';
import { MessagesComponentProps } from './types';

export default function Messages({
  chatHistory,
  llmResponse,
  isGenerating,
}: MessagesComponentProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const theme = useTheme();

  return (
    <View style={styles.chatContainer}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef?.current?.scrollToEnd()}
        contentContainerStyle={styles.scrollContent}
      >
        <View onStartShouldSetResponder={() => true}>
          {chatHistory.map((message, index) => (
            <MessageItem key={index} message={message} />
          ))}
          {isGenerating && (
            <View style={styles.aiMessage}>
              <Avatar.Icon
                size={32}
                icon="brain"
                color={theme.colors.onPrimary}
                style={{ backgroundColor: theme.colors.primary, marginRight: 8 }}
              />
              <Surface
                style={[styles.loadingBubble, { backgroundColor: theme.colors.surface }]}
                elevation={1}
              >
                {!llmResponse ? (
                  <View style={styles.messageLoadingContainer}>
                    <AnimatedChatLoading />
                  </View>
                ) : (
                  <Text
                    variant="bodyMedium"
                    style={{ color: theme.colors.onSurface, lineHeight: 20 }}
                  >
                    {llmResponse.trim()}
                  </Text>
                )}
              </Surface>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingVertical: 8,
  },
  aiMessage: {
    flexDirection: 'row',
    maxWidth: '85%',
    alignSelf: 'flex-start',
    marginVertical: 8,
    marginLeft: 8,
  },
  loadingBubble: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  messageLoadingContainer: {
    width: 60,
    height: 24,
    justifyContent: 'center',
  },
});
