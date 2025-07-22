// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  AppState,
  Alert,
} from 'react-native';
import {
  Text,
  TextInput,
  IconButton,
  Surface,
  Avatar,
  ActivityIndicator,
  useTheme,
} from 'react-native-paper';

import {
  LLAMA3_2_1B_QLORA,
  LLAMA3_2_TOKENIZER,
  LLAMA3_2_TOKENIZER_CONFIG,
  useLLM,
} from 'react-native-executorch'; // @ts-nocheck
import { SenderType, MessageType } from './types';
import Messages from './messages';
import { KeyboardAwareScreen } from 'md-keyboard-aware-screen';
import { useFocusEffect } from '@react-navigation/native';

// Define system prompt
const SYSTEM_PROMPT =
  "You are a helpful AI assistant running on a mobile device with limited resources. Provide concise, accurate responses. If you don't know something, just say so.";

export default function ChatAI() {
  const theme = useTheme();
  const [chatHistory, setChatHistory] = useState<Array<MessageType>>([]);
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);
  const [userInput, setUserInput] = useState('');
  // Reduced context window length from 6 to 4 to save memory
  const llama = useLLM({
    modelSource: LLAMA3_2_1B_QLORA,
    tokenizerSource: LLAMA3_2_TOKENIZER,
    tokenizerConfigSource: LLAMA3_2_TOKENIZER_CONFIG,
  });

  // Effect to handle response from LLM
  useEffect(() => {
    if (llama.response && !llama.isGenerating) {
      appendToMessageHistory(llama.response, 'assistant');
    }
  }, [llama.response, llama.isGenerating]);

  // Handle app state changes to manage memory
  useFocusEffect(
    useCallback(() => {
      // Listen for app state changes
      const subscription = AppState.addEventListener('change', nextAppState => {
        if (nextAppState === 'background') {
          // App is going to background, free up memory
          if (llama && llama.interrupt) {
            llama.interrupt();
          }
        }
      });

      // Listen for memory warnings (iOS)
      if (Platform.OS === 'ios') {
        const memoryWarningSubscription = AppState.addEventListener(
          'memoryWarning',
          () => {
            console.warn('Memory warning received!');
            // Interrupt LLM processing to free memory
            if (llama && llama.interrupt) {
              llama.interrupt();
            }
            // Clear chat history to free memory
            setChatHistory(prev => {
              if (prev.length > 2) {
                // Keep only the last message pair
                return prev.slice(prev.length - 2);
              }
              return prev;
            });

            Alert.alert(
              'Low Memory Warning',
              'The app is running low on memory. Some chat history has been cleared to prevent crashes.',
              [{ text: 'OK' }],
            );
          },
        );

        return () => {
          subscription.remove();
          memoryWarningSubscription.remove();
        };
      }

      return () => {
        subscription.remove();
      };
    }, []),
  );

  // Clean up resources when component unmounts
  useFocusEffect(
    useCallback(() => {
      return () => {
        // Force garbage collection when leaving the screen
        if (llama && llama.interrupt) {
          llama.interrupt();
        }

        // Clear chat history to free memory
        setChatHistory([]);
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        // Clean up resources when leaving the screen
        if (llama && llama.interrupt) {
          llama.interrupt();
        }
      };
    }, []),
  );

  const appendToMessageHistory = (content: string, role: SenderType) => {
    setChatHistory(prevHistory => {
      // Keep only the last 6 messages to save memory
      const newHistory = [...prevHistory, { role, content }];
      if (newHistory.length > 6) {
        return newHistory.slice(newHistory.length - 6);
      }
      return newHistory;
    });
  };

  const sendMessage = async () => {
    appendToMessageHistory(userInput.trim(), 'user');
    setUserInput('');
    Keyboard.dismiss();
    try {
      await llama.generate([
        { role: 'system', content: SYSTEM_PROMPT },
        ...chatHistory,
        { role: 'user', content: userInput },
      ]);
    } catch (e) {
      console.error(e);
    }
  };

  return !llama.isReady ? (
    <Surface style={styles.loadingContainer}>
      <ActivityIndicator animating size="large" color={theme.colors.primary} />
      <Text style={styles.loadingText}>
        Loading the model {(llama.downloadProgress * 100).toFixed(0)}%
      </Text>
    </Surface>
  ) : (
    <KeyboardAwareScreen style={styles.keyboardAwareContainer} scrollEnabled={false}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.touchableContainer}>
        <View style={styles.mainContainer}>
          <Surface
            style={[
              styles.topContainer,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
            elevation={1}>
            <Avatar.Icon
              size={40}
              icon="brain"
              color={theme.colors.onPrimary}
              style={[
                styles.topAvatar,
                { backgroundColor: theme.colors.primary },
              ]}
            />
            <Text
              style={[
                styles.textModelName,
                { color: theme.colors.onSurfaceVariant },
              ]}
              variant="titleMedium">
              Llama 3.2 1B QLoRA
            </Text>
          </Surface>

          <View style={styles.contentContainer}>
            {chatHistory.length ? (
              <View style={styles.chatContainer}>
                <Messages
                  chatHistory={chatHistory}
                  llmResponse={llama.response}
                  isGenerating={llama.isGenerating}
                />
              </View>
            ) : (
              <Surface style={styles.helloMessageContainer} elevation={0}>
                <Avatar.Icon
                  size={80}
                  icon="brain"
                  color={theme.colors.onPrimary}
                  style={[
                    styles.helloAvatar,
                    { backgroundColor: theme.colors.primary },
                  ]}
                />
                <Text
                  style={[styles.helloTitle, { color: theme.colors.onSurface }]}
                  variant="headlineMedium">
                  Hello! 👋
                </Text>
                <Text
                  style={[styles.helloSubtitle, { color: theme.colors.onSurface }]}
                  variant="bodyLarge">
                  What can I help you with?
                </Text>
              </Surface>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>

      <Surface style={[styles.bottomContainer, { backgroundColor: theme.colors.surface }]} elevation={2}>
        <TextInput
          mode="outlined"
          multiline
          scrollEnabled={false}
          placeholder="Type your message here..."
          placeholderTextColor="#9E9E9E"
          onFocus={() => setIsTextInputFocused(true)}
          onBlur={() => setIsTextInputFocused(false)}
          style={[styles.textInput, { backgroundColor: theme.colors.surface }]}
          outlineColor={
            isTextInputFocused
              ? theme.colors.primary
              : theme.colors.primaryContainer
          }
          activeOutlineColor={theme.colors.primary}
          onChangeText={(text: string) => setUserInput(text)}
          value={userInput}
          right={
            userInput ? (
              <TextInput.Icon
                icon="send"
                color={theme.colors.primary}
                disabled={llama.isGenerating}
                onPress={async () =>
                  !llama.isGenerating && (await sendMessage())
                }
              />
            ) : undefined
          }
        />

        {llama.isGenerating && (
          <IconButton
            icon="stop-circle"
            size={24}
            iconColor={theme.colors.primary}
            style={styles.stopButton}
            onPress={llama.interrupt}
          />
        )}
      </Surface>
    </KeyboardAwareScreen>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  keyboardAwareContainer: {
    flex: 1,
  },
  touchableContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  topContainer: {
    height: 68,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    paddingBottom: 80, // Exact space for the absolute input (minHeight: 80)
  },
  chatContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 8,
  },
  textModelName: {
    marginLeft: 12,
    fontWeight: '500',
  },
  helloMessageContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  bottomContainer: {
    minHeight: 80,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 5,
  },
  textInput: {
    flex: 1,
    flexGrow: 1,
    maxHeight: 120,
    marginBottom: 0,
    paddingBottom: 0,
  },
  stopButton: {
    marginLeft: 8,
  },
  topAvatar: {
    // Empty - backgroundColor will be added dynamically
  },
  helloAvatar: {
    marginBottom: 16,
    borderRadius: 40,
    elevation: 4,
  },
  helloTitle: {
    fontWeight: '600',
  },
  helloSubtitle: {
    marginTop: 8,
    textAlign: 'center',
  },
});
