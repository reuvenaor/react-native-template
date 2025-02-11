import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExamplesListScreen from '../screens/examples-list-screen';
import ReduxExampleScreen from '../screens/redux-screen';

const ExamplesListStack = createNativeStackNavigator();

function ExamplesListTab() {
  return (
    <ExamplesListStack.Navigator screenOptions={{ headerShown: false }}>
      <ExamplesListStack.Screen
        name="List Screen"
        component={ExamplesListScreen}
      />
      <ExamplesListStack.Screen
        name="Redux Example"
        component={ReduxExampleScreen}
      />
    </ExamplesListStack.Navigator>
  );
}

export default ExamplesListTab;
