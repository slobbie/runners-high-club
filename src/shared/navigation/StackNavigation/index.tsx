import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {screenPath} from '@shared/constants/screenPath';
import TabNavigation from '@shared/navigation/TabNavigation';
import {RootStackParams} from '@shared/interface/rootStackParams';

/**
 * 스택네비게이터 컴포넌트
 * @returns React.JSX.Element
 */
const StackNavigation = () => {
  const Stack = createStackNavigator<RootStackParams>();
  const navigationName = screenPath.navigation;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name={navigationName.tab as keyof RootStackParams}
          component={TabNavigation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
