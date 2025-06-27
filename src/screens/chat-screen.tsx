import { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  AppState,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spinner from 'react-native-loading-spinner-overlay';
import { LLAMA3_2_1B_QLORA, LLAMA3_2_TOKENIZER, LLAMA3_2_TOKENIZER_CONFIG, useLLM } from 'react-native-executorch';
import { SenderType, MessageType, ColorPalette } from '../components/examples/chat-ai';
import { Messages } from '../components/examples/chat-ai';
import Icon from '@expo/vector-icons/AntDesign';

export default function ChatScreen() {
  const [chatHistory, setChatHistory] = useState<Array<MessageType>>([]);
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);
  const [userInput, setUserInput] = useState('');

  // Reduced context window length from 6 to 4 to save memory
  const llama = useLLM({
    modelSource: LLAMA3_2_1B_QLORA,
    tokenizerSource: LLAMA3_2_TOKENIZER,
    tokenizerConfigSource: LLAMA3_2_TOKENIZER_CONFIG,
  });

  const textInputRef = useRef<TextInput>(null);

  // Handle app state changes to manage memory
  useEffect(() => {
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
      const memoryWarningSubscription = AppState.addEventListener('memoryWarning', () => {
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
          [{ text: 'OK' }]
        );
      });

      return () => {
        subscription.remove();
        memoryWarningSubscription.remove();
      };
    }

    return () => {
      subscription.remove();
    };
  }, []);

  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      // Force garbage collection when leaving the screen
      if (llama && llama.interrupt) {
        llama.interrupt();
      }

      // Clear chat history to free memory
      setChatHistory([]);
    };
  }, []);

  useEffect(() => {
    if (llama.response && !llama.isGenerating) {
      appendToMessageHistory(llama.response, 'assistant');
    }
  }, [llama.response, llama.isGenerating]);

  const appendToMessageHistory = (content: string, role: SenderType) => {
    setChatHistory((prevHistory) => {
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
    textInputRef.current?.clear();
    try {
      await llama.generate([{ role: 'user', content: userInput }]);
    } catch (e) {
      console.error(e);
    }
  };

  return !llama.isReady ? (
    <Spinner
      visible={!llama.isReady}
      textContent={`Loading the model ${(llama.downloadProgress * 100).toFixed(0)} %`}
    />
  ) : (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'android' ? 30 : 0}
        >
          <View style={styles.topContainer}>
            <Icon name={"heart"} width={45} height={45} />
            <Text style={styles.textModelName}>Llama 3.2 1B QLoRA</Text>
          </View>
          {chatHistory.length ? (
            <View style={styles.chatContainer}>
              <Messages
                chatHistory={chatHistory}
                llmResponse={llama.response}
                isGenerating={llama.isGenerating}
              />
            </View>
          ) : (
            <View style={styles.helloMessageContainer}>
              <Text style={styles.helloText}>Hello! 👋</Text>
              <Text style={styles.bottomHelloText}>
                What can I help you with?
              </Text>
            </View>
          )}

          <View style={styles.bottomContainer}>
            <TextInput
              onFocus={() => setIsTextInputFocused(true)}
              onBlur={() => setIsTextInputFocused(false)}
              style={{
                ...styles.textInput,
                borderColor: isTextInputFocused
                  ? ColorPalette.seaBlueDark
                  : ColorPalette.seaBlueLight,
              }}
              placeholder="Your message"
              placeholderTextColor={'#C1C6E5'}
              multiline={true}
              ref={textInputRef}
              onChangeText={(text: string) => setUserInput(text)}
            />
            {userInput && (
              <TouchableOpacity
                style={styles.sendChatTouchable}
                onPress={async () =>
                  !llama.isGenerating && (await sendMessage())
                }
              >
                <Icon name={"message1"} height={24} width={24} padding={4} margin={8} />
              </TouchableOpacity>
            )}
            {llama.isGenerating && (
              <TouchableOpacity
                style={styles.sendChatTouchable}
                onPress={llama.interrupt}
              >
                <Icon name={"pause"} height={24} width={24} padding={4} margin={8} />
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  topContainer: {
    height: 68,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatContainer: {
    flex: 10,
    width: '100%',
  },
  textModelName: {
    color: ColorPalette.primary,
  },
  helloMessageContainer: {
    flex: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helloText: {
    fontFamily: 'medium',
    fontSize: 30,
    color: ColorPalette.primary,
  },
  bottomHelloText: {
    fontFamily: 'regular',
    fontSize: 20,
    lineHeight: 28,
    color: ColorPalette.primary,
  },
  bottomContainer: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    lineHeight: 19.6,
    fontFamily: 'regular',
    fontSize: 14,
    color: ColorPalette.primary,
    padding: 16,
  },
  sendChatTouchable: {
    height: '100%',
    width: 48,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
