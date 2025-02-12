import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import {
  SettingsScreenName,
  SettingsStackParamList,
} from '../types/navigation';
import AppSafeAreaView from '../components/hocs/safe-area-view';
import FlashListExample from '../components/examples/flash-list';

function ExamplesListScreen({}: {
  navigation: NavigationProp<
    SettingsStackParamList,
    SettingsScreenName.Settings
  >;
}) {
  return (
    <AppSafeAreaView style={styles.con}>
      <FlashListExample />
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  con: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { textAlign: 'center' },
});

export default ExamplesListScreen;
