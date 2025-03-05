import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import {RootStackParams} from '@shared/interface/rootStackParams';
import CompleteRunScreen from '@features/completeRun/screen/CompleteRunScreen';
import RunScreen from '@features/run/screen/RunScreen';
import {HeaderIconButton} from '@shared/components/molecules';
import RunTrackerScreen from '@features/runTracker/screen/RunTrackerScreen';

/**
 *
 */
const RunStack = () => {
  const Stack = createStackNavigator<RootStackParams>();

  return (
    <Stack.Navigator
      initialRouteName={'runScreen'}
      screenOptions={{
        headerTitle: '',
        headerShown: false,
      }}>
      <Stack.Screen
        name={'runScreen'}
        component={RunScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={'completeRunScreen'}
        component={CompleteRunScreen}
        options={({navigation}) => ({
          headerLeft: () => {
            const goBack = () => {
              navigation.goBack();
            };
            return <HeaderIconButton onPress={goBack} iconName="arrowPrev" />;
          },
        })}
      />
      <Stack.Screen
        name={'runTrackerScreen'}
        component={RunTrackerScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 160,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 160,
              },
            },
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default RunStack;
