import React, { lazy, Suspense } from 'react';
import NotFoundScreen from './not-found-screen';

// Create a safe lazy loader that catches import errors at runtime
const SkiaScreen = lazy(() =>
  import('md-skia-accelerometer-screen').catch(() => ({
    default: () => <NotFoundScreen moduleName="md-skia-accelerometer-screen" />,
  }))
);

export default function SkiaScreenOpt() {
  return (
    <Suspense fallback={<NotFoundScreen moduleName="md-skia-accelerometer-screen" />}>
      <SkiaScreen />
    </Suspense>
  );
}
