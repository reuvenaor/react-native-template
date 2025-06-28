import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { ColorPalette } from './types';
import { useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function AnimatedChatLoading() {
  const progress = useSharedValue(0);

  // Move animation setup to useEffect to avoid modifying shared value during render
  useFocusEffect(useCallback(() => {
    progress.value = withRepeat(withTiming(1, { duration: 500 }), -1, true);
  }, []));

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [
          ColorPalette.seaBlueLight,
          ColorPalette.seaBlueMedium,
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
