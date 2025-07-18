import * as React from 'react';
import { Provider, persistor, store, PersistGate } from 'md-redux-store';
import { ErrorBoundary } from 'md-error-boundary';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import TabsNavigator from './src/tabs/tabs-navigator';

// Create a custom theme with your preferred colors
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    // Update these colors to change header appearance
    primary: '#1976D2', // Main header color
    onPrimary: '#FFFFFF', // Text/icons on primary color
    primaryContainer: '#E3F2FD', // Container with primary color
    secondary: '#0D47A1', // Secondary color
    background: '#F5F5F5', // App background
  },
};

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={theme}>
            <SafeAreaProvider>
              <TabsNavigator />
            </SafeAreaProvider>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}
