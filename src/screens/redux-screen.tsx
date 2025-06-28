import React from 'react';
import { StyleSheet } from 'react-native';
import { CounterRedux } from '../components/examples/counter-redux';
import KeyboardAwareScreen from '../components/hocs/keyboard-aware-screen';

function ReduxExampleScreen(): React.JSX.Element {
  return (
    <KeyboardAwareScreen
      extraScrollHeight={50}
      contentContainerStyle={styles.contentContainer}
    >
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

export default ReduxExampleScreen;
