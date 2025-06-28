import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { BottomNavigation, Icon, useTheme } from 'react-native-paper';
import { BottomTabParamList, TabsName } from '../types/navigation';
import ExamplesListTab from './examples-list-tab';
import SettingsTab from './settings-tab';
import { StatusBar, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function TabsNavigator() {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={theme.colors.surfaceVariant}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <Tab.Navigator
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            style={[
              styles.bottomBar,
              { backgroundColor: theme.colors.elevation.level2 }
            ]}
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
                return (
                  <View style={styles.iconContainer}>
                    {focused && (
                      <Animated.View
                        style={[
                          styles.activeIndicator,
                          { backgroundColor: theme.colors.primary },
                          useAnimatedStyle(() => ({
                            transform: [
                              {
                                scaleX: withSpring(1, {
                                  damping: 15,
                                  stiffness: 120
                                })
                              },
                            ],
                          }))
                        ]}
                      />
                    )}
                    {options.tabBarIcon({
                      focused,
                      color: focused ? theme.colors.primary : theme.colors.onSurfaceVariant,
                      size: 32
                    })}
                  </View>
                );
              }
              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              return options.tabBarLabel as string;
            }}
            activeIndicatorStyle={{ height: 0 }}
            activeColor={theme.colors.primary}
            inactiveColor={theme.colors.onSurfaceVariant}
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

const styles = StyleSheet.create({
  bottomBar: {
    height: 70,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 60,
    height: 36,
  },
  activeIndicator: {
    position: 'absolute',
    top: -6,
    height: 3,
    width: 24,
    borderRadius: 2,
    transform: [{ scaleX: 0 }]
  }
});
