import React from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { BottomTabParamList, TabsName } from '../types/navigation';
import AppSafeAreaView from '../components/hocs/safe-area-view';

function SettingsScreen({
  navigation,
}: {
  navigation: NavigationProp<BottomTabParamList, TabsName.ExamplesList>;
}) {
  return (
    <AppSafeAreaView style={styles.con}>
      <Text style={styles.text}>Settings screen</Text>
      <Button
        title="Go to List Screen"
        onPress={() => navigation.navigate(TabsName.ExamplesList)}
      />
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  con: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { textAlign: 'center' },
});

export default SettingsScreen;
