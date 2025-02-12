/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { CounterRedux } from '../components/examples/counter-redux';
import AppSafeAreaView from '../components/hocs/safe-area-view';

function ReduxExampleScreen(): React.JSX.Element {
  return (
    <AppSafeAreaView>
      <CounterRedux />
    </AppSafeAreaView>
  );
}

export default ReduxExampleScreen;
