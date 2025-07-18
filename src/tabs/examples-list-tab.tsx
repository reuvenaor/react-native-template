import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExamplesListScreenName } from '../types/navigation';
import ExamplesListScreen from '../screens/examples-list-screen';
import { ReduxExampleScreen } from 'md-redux-screen';
import { SkiaAccelScreen } from 'md-skia-accelerometer-screen';
import { ChatScreen } from 'md-chat-ai-screen';
import { usesScreenOptions } from '../hooks/screen-options';

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
        component={ReduxExampleScreen}
        options={{ title: 'Redux Example' }}
      />
      <ExamplesListStack.Screen
        name={ExamplesListScreenName.SkiaAccelerometer}
        component={SkiaAccelScreen}
        options={{ title: 'Accelerometer' }}
      />
      <ExamplesListStack.Screen
        name={ExamplesListScreenName.Chat}
        component={ChatScreen}
        options={{ title: 'Chat AI' }}
      />
    </ExamplesListStack.Navigator>
  );
}

export default ExamplesListTab;
