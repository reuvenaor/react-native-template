import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import {
  SettingsScreenName,
  SettingsStackParamList,
} from '../types/navigation';
import AppSafeAreaView from '../components/hocs/safe-area-view';

function ExamplesListScreen({}: {
  navigation: NavigationProp<
    SettingsStackParamList,
    SettingsScreenName.Settings
  >;
}) {
  return (
    <AppSafeAreaView style={styles.con}>
      <Text style={styles.text}>Examples List Screen</Text>
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
