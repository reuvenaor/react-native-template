import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { BottomNavigation, Icon } from 'react-native-paper';
import { BottomTabParamList, TabsName } from '../types/navigation';
import ExamplesListTab from './examples-list-tab';
import SettingsTab from './settings-tab';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function TabsNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            keyboardHidesNavigationBar={true}
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }
              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              return options.tabBarLabel as string;
            }}
          />
        )}
      >
        <Tab.Screen
          name={TabsName.ExamplesList}
          component={ExamplesListTab}
          options={{
            headerShown: false,
            tabBarLabel: 'Examples',
            tabBarIcon: ({ color, size }) => (
              <Icon source="view-list" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={TabsName.Settings}
          component={SettingsTab}
          options={{
            headerShown: false,
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Icon source="cog" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
