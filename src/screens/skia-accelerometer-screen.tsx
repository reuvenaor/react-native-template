/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppSafeAreaView from '../components/hocs/safe-area-view';
import SkiaAccelerometer from '../components/examples/skia-accelerometer';

function SkiaAccelScreen(): React.JSX.Element {
  return (
    <AppSafeAreaView>
      <SkiaAccelerometer />
    </AppSafeAreaView>
  );
}

export default SkiaAccelScreen;
