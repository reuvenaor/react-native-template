import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SettingsScreenName,
  SettingsStackParamList,
} from '../types/navigation';
import SettingsScreen from '../screens/settings-screen';

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

function SettingsTab() {
  return (
    <SettingsStack.Navigator
      screenOptions={{ headerShown: false, orientation: 'portrait' }}>
      <SettingsStack.Screen
        name={SettingsScreenName.Settings}
        component={SettingsScreen}
      />
    </SettingsStack.Navigator>
  );
}

export default SettingsTab;
