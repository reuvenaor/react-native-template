import { lazy } from 'react';
import { SuspenseScreen } from '../components/hocs/suspense-screen-hoc';

const ExamplesListScreen = lazy(() => {
  return import('md-redux-screen');
});

export default function ReduxScreenOpt() {
  return (
    <SuspenseScreen
      component={ExamplesListScreen}
      moduleName="md-redux-screen"
    />
  );
}
