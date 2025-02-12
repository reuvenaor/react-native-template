import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExamplesListScreenName } from '../types/navigation';
import ExamplesListScreen from '../screens/examples-list-screen';
import ReduxExampleScreen from '../screens/redux-screen';
import SkiaAccelScreen from '../screens/skia-accelerometer-screen';

const ExamplesListStack = createNativeStackNavigator();

function ExamplesListTab() {
  return (
    <ExamplesListStack.Navigator
      screenOptions={{ headerShown: false, orientation: 'portrait' }}>
      <ExamplesListStack.Screen
        name={ExamplesListScreenName.ExamplesList}
        component={ExamplesListScreen}
      />
      <ExamplesListStack.Screen
        name={ExamplesListScreenName.ReduxExample}
        component={ReduxExampleScreen}
      />
      <ExamplesListStack.Screen
        name={ExamplesListScreenName.SkiaAccelerometer}
        component={SkiaAccelScreen}
      />
    </ExamplesListStack.Navigator>
  );
}

export default ExamplesListTab;
