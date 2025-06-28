import { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Surface, Avatar, Text } from 'react-native-paper';
import AnimatedChatLoading from './animated-chat-loading';
import MessageItem from './message-item';
import { MessagesComponentProps, ColorPalette } from './types';

export default function Messages({
  chatHistory,
  llmResponse,
  isGenerating,
}: MessagesComponentProps) {
  const scrollViewRef = useRef<ScrollView>(null);

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
                color="white"
                style={styles.aiAvatar}
              />
              <Surface style={styles.loadingBubble} elevation={1}>
                {!llmResponse ? (
                  <View style={styles.messageLoadingContainer}>
                    <AnimatedChatLoading />
                  </View>
                ) : (
                  <Text variant="bodyMedium" style={styles.messageText}>
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
  aiAvatar: {
    backgroundColor: ColorPalette.seaBlueMedium,
    marginRight: 8,
  },
  loadingBubble: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F5F5F5',
  },
  messageLoadingContainer: {
    width: 60,
    height: 24,
    justifyContent: 'center',
  },
  messageText: {
    color: ColorPalette.primary,
    lineHeight: 20,
  },
});
