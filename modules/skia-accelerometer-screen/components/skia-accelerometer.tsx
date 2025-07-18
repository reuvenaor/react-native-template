import React, { useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Reanimated, {
  useSharedValue,
  useDerivedValue,
  runOnUI,
} from 'react-native-reanimated';
import { accelerometer, SensorData } from 'react-native-sensors';
import SkiaCanvas, { CARD_WIDTH } from './skia-canvas';

const SkiaAccelerometer = () => {
  const rollVal = useSharedValue(0);

  const subscribe = useCallback(
    function ({ x, y, z }: SensorData) {
      'worklet';
      const length = Math.sqrt(x * x + y * y + z * z);
      const normalizedY = y / length;
      const normalizedZ = z / length;

      // Calculate roll,
      const rollRad = Math.atan2(normalizedY, normalizedZ);

      // Convert radians to degrees
      const roll = rollRad * (180 / Math.PI);

      rollVal.value = Math.round(roll);
    },
    [rollVal],
  );

  const onSubscribe = useCallback(
    function (data: SensorData) {
      runOnUI(subscribe)(data);
    },
    [subscribe],
  );

  useEffect(() => {
    const subscription = accelerometer.subscribe(onSubscribe);
    return () => subscription.unsubscribe();
  }, [onSubscribe]);

  const rotateX = useDerivedValue(() => {
    return `${rollVal.value}deg`;
  }, []);

  return (
    <Reanimated.View style={[styles.container]}>
      <SkiaCanvas rotateX={rotateX} />
      <Reanimated.View style={styles.lineWrapper}>
        <Reanimated.View
          style={[styles.line, { transform: [{ rotateZ: rotateX }] }]}
        />
      </Reanimated.View>
    </Reanimated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lineWrapper: {
    flex: 1,
    zIndex: 2,
    alignItems: 'center',
  },
  line: {
    backgroundColor: 'blue',
    height: 10,
    width: CARD_WIDTH,
    zIndex: 2,
  },
});

export default SkiaAccelerometer;
