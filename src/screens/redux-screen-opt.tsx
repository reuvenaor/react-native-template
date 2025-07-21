import React, { lazy, Suspense } from 'react';
import NotFoundScreen from './not-found-screen';

// Create a safe lazy loader that catches import errors at runtime
const ReduxScreen = lazy(() =>
  import('md-redux-screen').catch(() => ({
    default: () => <NotFoundScreen moduleName="md-redux-screen" />,
  }))
);

export default function ReduxScreenOpt() {
  return (
    <Suspense fallback={<NotFoundScreen moduleName="md-redux-screen" />}>
      <ReduxScreen />
    </Suspense>
  );
}
