import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExamplesListScreen from '../screens/examples-list-screen';
import ReduxExampleScreen from '../screens/redux-screen';
import { ExamplesListScreenName } from '../types/navigation';

const ExamplesListStack = createNativeStackNavigator();

function ExamplesListTab() {
  return (
    <ExamplesListStack.Navigator screenOptions={{ headerShown: false }}>
      <ExamplesListStack.Screen
        name={ExamplesListScreenName.ExamplesList}
        component={ExamplesListScreen}
      />
      <ExamplesListStack.Screen
        name={ExamplesListScreenName.ReduxExample}
        component={ReduxExampleScreen}
      />
    </ExamplesListStack.Navigator>
  );
}

export default ExamplesListTab;
