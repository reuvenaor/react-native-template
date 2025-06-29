import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

export default function AnimatedChatLoading() {
  const progress = useSharedValue(0);
  const theme = useTheme();

  useFocusEffect(useCallback(() => {
    progress.value = withRepeat(withTiming(1, { duration: 500 }), -1, true);
  }, []));

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [
          theme.colors.primary,
          theme.colors.primaryContainer,
        ]
      ),
      opacity: 0.7 + progress.value * 0.3,
    };
  });

  return (
    <View style={styles.messageLoadingContainer}>
      <Animated.View style={[styles.loadingDot, animatedStyle]} />
      <Animated.View
        style={[
          styles.loadingDot,
          animatedStyle,
          { marginHorizontal: 6 }
        ]}
      />
      <Animated.View style={[styles.loadingDot, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  messageLoadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
