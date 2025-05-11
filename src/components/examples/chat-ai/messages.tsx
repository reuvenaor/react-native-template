import { useRef } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import AnimatedChatLoading from './animated-chat-loading';
import MessageItem from './message-item';
import Icon from '@expo/vector-icons/AntDesign';
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
      >
        <View onStartShouldSetResponder={() => true}>
          {chatHistory.map((message, index) => (
            <MessageItem key={index} message={message} />
          ))}
          {isGenerating && (
            <View style={styles.aiMessage}>
              <View style={styles.aiMessageIconContainer}>
                <Icon name={"heart"} width={24} height={24} />
              </View>
              {!llmResponse ? (
                <View style={styles.messageLoadingContainer}>
                  <AnimatedChatLoading />
                </View>
              ) : (
                <Text style={styles.messageText}> {llmResponse.trim()}</Text>
              )}
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
  aiMessage: {
    flexDirection: 'row',
    maxWidth: '80%',
    alignSelf: 'flex-start',
    marginVertical: 8,
  },
  messageLoadingContainer: {
    width: 28,
  },
  aiMessageIconContainer: {
    backgroundColor: ColorPalette.seaBlueLight,
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginHorizontal: 7,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 19.6,
    color: ColorPalette.primary,
    fontFamily: 'regular',
  },
});
