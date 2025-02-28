import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '@features/login/LoginScreen';
import {screenPath} from '@shared/constants/screenPath';
import TabNavigation from '@shared/navigation/TabNavigation';
import {IRunRecord} from '@api/run/interface/run.interface';

export type RootStackParamList = {
  login: undefined;
  tab: undefined;
  run: {
    run: undefined;
  };
  recordStack: {
    record: undefined;
    recordDetail: IRunRecord;
  };
};

/**
 * 스택네비게이터 컴포넌트
 * @returns React.JSX.Element
 */
const StackNavigation = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const pathName = screenPath.feature;
  const navigationName = screenPath.navigation;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {/* 로그인 스크린 */}
        <Stack.Screen
          name={pathName.login as keyof RootStackParamList}
          component={LoginScreen}
        />
        <Stack.Screen
          name={navigationName.tab as keyof RootStackParamList}
          component={TabNavigation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
