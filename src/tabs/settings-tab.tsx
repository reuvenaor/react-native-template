import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SettingsScreenName,
  SettingsStackParamList,
} from '../types/navigation';
import ChatScreen from '../screens/chat-screen';

const ExamplesListStack = createNativeStackNavigator<SettingsStackParamList>();

function SettingsTab() {

  return (
    <ExamplesListStack.Navigator
      screenOptions={{ headerShown: false, orientation: 'portrait' }}>
      <ExamplesListStack.Screen
        name={SettingsScreenName.Chat}
        component={ChatScreen}
      />
    </ExamplesListStack.Navigator>
  );
}

export default SettingsTab;
