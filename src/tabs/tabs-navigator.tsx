import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { BottomTabParamList, TabsName } from '../types/navigation';
import ExamplesListTab from './examples-list-tab';
import SettingsTab from './settings-tab';
import { Icon } from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator<BottomTabParamList>();

const getTabBarIcon =
  (iconName: React.ComponentProps<typeof Icon>['source']) =>
    ({ color }: { color: string }) =>
      <Icon source={iconName} color={color} size={26} />;

export default function TabsNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator shifting={true}>
        <Tab.Screen
          name={TabsName.ExamplesList}
          component={ExamplesListTab}
          options={{
            tabBarLabel: 'Examples',
            tabBarIcon: getTabBarIcon('view-list'),
            tabBarBadge: false,
            tabBarAccessibilityLabel: 'Examples',
          }}
        />
        <Tab.Screen
          name={TabsName.Settings}
          component={SettingsTab}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: getTabBarIcon('cog'),
            tabBarBadge: false,
            tabBarAccessibilityLabel: 'Settings',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
