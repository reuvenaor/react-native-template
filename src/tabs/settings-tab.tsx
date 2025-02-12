import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SettingsScreenName,
  SettingsStackParamList,
} from '../types/navigation';
import SettingsScreen from '../screens/settings-screen';

const ExamplesListStack = createNativeStackNavigator<SettingsStackParamList>();

function SettingsTab() {
  return (
    <ExamplesListStack.Navigator
      screenOptions={{ headerShown: false, orientation: 'portrait' }}>
      <ExamplesListStack.Screen
        name={SettingsScreenName.Settings}
        component={SettingsScreen}
      />
    </ExamplesListStack.Navigator>
  );
}

export default SettingsTab;
