import {
  CommonActions,
  NavigationContainer,
  Route,
} from '@react-navigation/native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { BottomNavigation, Icon, MD3Theme, useTheme } from 'react-native-paper';
import { BottomTabParamList, TabsName } from '../types/navigation';
import ExamplesListTab from './examples-list-tab';
import SettingsTab from './settings-tab';
import { StatusBar, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const Tab = createBottomTabNavigator<BottomTabParamList>();

type RenderIconProps = {
  route: Route<string>;
  focused: boolean;
  descriptors: BottomTabBarProps['descriptors'];
  theme: MD3Theme;
};

const RenderIcon = ({
  route,
  focused,
  descriptors,
  theme,
}: RenderIconProps) => {
  const { options } = descriptors[route.key];
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scaleX: withSpring(1, {
          damping: 15,
          stiffness: 120,
        }),
      },
    ],
  }));
  if (options.tabBarIcon) {
    return (
      <View style={styles.iconContainer}>
        {focused && (
          <Animated.View
            style={[
              styles.activeIndicator,
              { backgroundColor: theme.colors.primary },
              animatedStyle,
            ]}
          />
        )}
        {options.tabBarIcon({
          focused,
          color: focused ? theme.colors.primary : theme.colors.onSurfaceVariant,
          size: 32,
        })}
      </View>
    );
  }
  return null;
};

const BottomTabsBar = ({
  navigation,
  state,
  descriptors,
  insets,
  theme,
}: BottomTabBarProps & { theme: MD3Theme }) => {
  return (
    <BottomNavigation.Bar
      style={[
        styles.bottomBar,
        { backgroundColor: theme.colors.elevation.level2 },
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
      renderIcon={({ route, focused }) => (
        <RenderIcon
          focused={focused}
          descriptors={descriptors}
          theme={theme}
          route={route}
        />
      )}
      getLabelText={({ route }) => {
        const { options } = descriptors[route.key];
        return options.tabBarLabel as string;
      }}
      activeIndicatorStyle={styles.activeIndicatorStyle}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.onSurfaceVariant}
    />
  );
};

type TabBarIconProps = {
  color: string;
  size: number;
};

const TabBarIcon =
  (source: string) =>
  ({ color, size }: TabBarIconProps) =>
    <Icon source={source} color={color} size={size} />;

const TabBarIconList = TabBarIcon('view-list');

const TabBarIconSettings = TabBarIcon('cog');

export default function TabsNavigator() {
  const theme = useTheme();
  const tabBar = (props: BottomTabBarProps) => (
    <BottomTabsBar {...props} theme={theme} />
  );
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={theme.colors.surfaceVariant}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <Tab.Navigator tabBar={tabBar}>
        <Tab.Screen
          name={TabsName.ExamplesList}
          component={ExamplesListTab}
          options={{
            headerShown: false,
            tabBarLabel: 'Examples',
            tabBarIcon: TabBarIconList,
          }}
        />
        <Tab.Screen
          name={TabsName.Settings}
          component={SettingsTab}
          options={{
            headerShown: false,
            tabBarLabel: 'Settings',
            tabBarIcon: TabBarIconSettings,
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
    transform: [{ scaleX: 0 }],
  },
  activeIndicatorStyle: { height: 0 },
});
