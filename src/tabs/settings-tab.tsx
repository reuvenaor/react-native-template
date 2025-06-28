import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SettingsScreenName,
  SettingsStackParamList,
} from '../types/navigation';
import SettingsScreen from '../screens/settings-screen';
import { usesScreenOptions } from '../hooks/screen-options';

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

function SettingsTab() {
  const screenOptions = usesScreenOptions();

  return (
    <SettingsStack.Navigator screenOptions={screenOptions}>
      <SettingsStack.Screen
        name={SettingsScreenName.Settings}
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </SettingsStack.Navigator>
  );
}

export default SettingsTab;
