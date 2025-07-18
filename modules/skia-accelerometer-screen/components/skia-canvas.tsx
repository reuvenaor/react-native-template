import React, { memo, useMemo } from 'react';
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

// Skia TeXt config
const fontFamily = Platform.select({ ios: 'Helvetica', default: 'serif' });
const fontStyle = {
  fontFamily,
  fontSize: 20,
  fontWeight: FontWeight.Bold,
};

const SkiaCanvas = ({ rotateX }: { rotateX: AnimatedProp<string> }) => {
  const font = useMemo(() => matchFont(fontStyle as any), []);

  const roundedRect = useMemo(() =>
    rrect(
      rect(
        (width - CARD_WIDTH) / 2,
        (height - CARD_HEIGHT) / 2,
        CARD_WIDTH,
        CARD_HEIGHT,
      ),
      10,
      10,
    ),
    []
  );

  const startVec = useMemo(() => vec(0, 0), []);
  const endVec = useMemo(() => vec(CARD_WIDTH, CARD_HEIGHT), []);
  const circleCenter = useMemo(() => vec(width / 2, (height + CARD_HEIGHT - 20) / 2), []);

  return (
    <Canvas style={styles.canvas}>
      <Group color={'blue'}>
        <RoundedRect rect={roundedRect} color="cyan">
          <LinearGradient
            start={startVec}
            end={endVec}
            colors={['blue', 'cyan']}
          />
        </RoundedRect>
        <Circle
          c={circleCenter}
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

export default memo(SkiaCanvas);
