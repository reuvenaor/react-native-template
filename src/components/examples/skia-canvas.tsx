import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import {
  Canvas,
  Text,
  LinearGradient,
  RoundedRect,
  vec,
  matchFont,
  FontWeight,
  Circle,
  Group,
  rrect,
  rect,
  AnimatedProp,
} from '@shopify/react-native-skia';

const { width, height } = Dimensions.get('window');

// Skia REcTANGLE config
export const CARD_WIDTH = width * 0.9;
export const CARD_HEIGHT = CARD_WIDTH / 1.618;

const roundedRect = rrect(
  rect(
    (width - CARD_WIDTH) / 2,
    (height - CARD_HEIGHT) / 2,
    CARD_WIDTH,
    CARD_HEIGHT,
  ),
  10,
  10,
);

// Skia TeXt config
const fontFamily = Platform.select({ ios: 'Helvetica', default: 'serif' });
const fontStyle = {
  fontFamily,
  fontSize: 20,
  fontWeight: FontWeight.Bold,
};

const SkiaCanvas = ({ rotateX }: { rotateX: AnimatedProp<string> }) => {
  const font = matchFont(fontStyle as any);

  return (
    <Canvas style={styles.canvas} mode={'default'}>
      <Group color={'blue'}>
        <RoundedRect rect={roundedRect} color="cyan">
          <LinearGradient
            start={vec(0, 0)}
            end={vec(CARD_WIDTH, CARD_HEIGHT)}
            colors={['blue', 'cyan']}
          />
        </RoundedRect>
        <Circle
          c={vec(width / 2, (height + CARD_HEIGHT - 20) / 2)}
          r={20}
          color="blue"
        />
        <Text
          color={'blue'}
          font={font}
          text={rotateX}
          y={CARD_HEIGHT}
          x={CARD_WIDTH / 2}
        />
      </Group>
    </Canvas>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 2,
    flexGrow: 2,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SkiaCanvas;
