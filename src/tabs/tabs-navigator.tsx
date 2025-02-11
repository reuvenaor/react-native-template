import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExamplesListTab from './examples-list-tab';
import { BottomTabParamList, TabsName } from '../types/navigation';
import SettingsTab from './settings-tab';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function TabsNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name={TabsName.ExamplesList} component={ExamplesListTab} />
        <Tab.Screen name={TabsName.SettingsTab} component={SettingsTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
