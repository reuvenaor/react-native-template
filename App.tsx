import * as React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import ErrorBoundary from './src/components/utils/ErrorBoundry';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabsNavigator from './src/tabs/tabs-navigator';

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <TabsNavigator />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}
