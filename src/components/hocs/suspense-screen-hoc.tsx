import React, { Suspense } from 'react';
import NotFoundScreen from '../../screens/not-found-screen';

interface SuspenseScreenProps {
  component: React.ComponentType<any>;
  fallback?: React.ComponentType<any>;
  moduleName?: string;
}

export function SuspenseScreen({
  component: Component,
  moduleName,
}: SuspenseScreenProps) {
  return (
    <Suspense fallback={<NotFoundScreen moduleName={moduleName} />}>
      <Component />
    </Suspense>
  );
}
