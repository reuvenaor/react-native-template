import { lazy } from 'react';
import { SuspenseScreen } from '../components/hocs/suspense-screen-hoc';

const SkiaScreen = lazy(() => {
  return import('md-skia-accelerometer-screen');
});

export default function SkiaScreenOpt() {
  return (
    <SuspenseScreen
      component={SkiaScreen}
      moduleName="md-skia-accelerometer-screen"
    />
  );
}
