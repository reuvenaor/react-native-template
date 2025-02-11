import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import {
  SettingsScreenName,
  SettingsStackParamList,
} from '../types/navigation';
import AppSafeAreaView from '../components/hocs/safe-area-view';

function SettingsScreen({}: {
  navigation: NavigationProp<
    SettingsStackParamList,
    SettingsScreenName.Settings
  >;
}) {
  return (
    <AppSafeAreaView style={styles.con}>
      <Text style={styles.text}>Settings screen</Text>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  con: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { textAlign: 'center' },
});

export default SettingsScreen;
