import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import TabNavigation from '@shared/navigation/TabNavigation';
import {RootStackParams} from '@shared/interface/rootStackParams';
import PrepareRunScreen from '@features/prepareRun/screen';

/**
 * 스택네비게이터 컴포넌트
 * @returns React.JSX.Element
 */
const StackNavigation = () => {
  const Stack = createStackNavigator<RootStackParams>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="tab"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={'tab'} component={TabNavigation} />
        <Stack.Screen
          name={'prepareRunScreen'}
          component={PrepareRunScreen}
          options={() => ({
            headerShown: false,
            animationEnabled: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
