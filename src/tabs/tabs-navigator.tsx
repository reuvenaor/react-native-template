import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExamplesListTab from './examples-list-tab';
import { BottomTabParamList, TabsName } from '../types/navigation';
import SettingsTab from './settings-tab';
import Icon from '@react-native-vector-icons/ant-design';

const getTabBarIcon =
  (iconName: React.ComponentProps<typeof Icon>['name']) =>
  ({ color, size }: { color: string; size: number }) =>
    <Icon name={iconName} color={color} size={size} />;

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function TabsNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name={TabsName.ExamplesList}
          component={ExamplesListTab}
          options={{
            tabBarIcon: getTabBarIcon('ordered-list'),
          }}
        />
        <Tab.Screen
          name={TabsName.Settings}
          component={SettingsTab}
          options={{
            tabBarIcon: getTabBarIcon('setting'),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
