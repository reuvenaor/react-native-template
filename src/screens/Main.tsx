/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView } from 'react-native';
import { CounterRedux } from '../components/CounterRedux';

function Main(): React.JSX.Element {
  return (
    <SafeAreaView>
      <CounterRedux />
    </SafeAreaView>
  );
}

export default Main;
