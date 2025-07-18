import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExamplesListScreenName } from '../types/navigation';
import { usesScreenOptions } from '../hooks/screen-options';
import ExamplesListScreen from '../screens/examples-list-screen';
import ReduxScreenOpt from '../screens/redux-screen-opt';
import ChatScreenOpt from '../screens/chat-ai-screen-opt';
import SkiaScreenOpt from '../screens/skia-screen-opt';

const ExamplesListStack = createNativeStackNavigator();

function ExamplesListTab() {
  const screenOptions = usesScreenOptions();
  return (
    <ExamplesListStack.Navigator screenOptions={screenOptions}>
      <ExamplesListStack.Screen
        name={ExamplesListScreenName.ExamplesList}
        component={ExamplesListScreen}
        options={{ title: 'Examples' }}
      />
      <ExamplesListStack.Screen
        name={ExamplesListScreenName.ReduxExample}
        component={ReduxScreenOpt}
        options={{ title: 'Redux Example' }}
      />
      <ExamplesListStack.Screen
        name={ExamplesListScreenName.SkiaAccelerometer}
        component={SkiaScreenOpt}
        options={{ title: 'Accelerometer' }}
      />
      <ExamplesListStack.Screen
        name={ExamplesListScreenName.Chat}
        component={ChatScreenOpt}
        options={{ title: 'Chat AI' }}
      />
    </ExamplesListStack.Navigator>
  );
}

export default ExamplesListTab;
