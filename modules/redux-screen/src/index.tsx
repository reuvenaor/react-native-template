import React from 'react';
import { StyleSheet } from 'react-native';
import { CounterRedux } from './components/counter-redux';
import { KeyboardAwareScreen } from 'md-keyboard-aware-screen';

export function ReduxExampleScreen(): React.JSX.Element {
  return (
    <KeyboardAwareScreen
      extraScrollHeight={50}
      contentContainerStyle={styles.contentContainer}>
      <CounterRedux />
    </KeyboardAwareScreen>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    flexGrow: 1,
  },
});
