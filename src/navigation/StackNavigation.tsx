// =============================================================================
// File    :  StackNavigation.tsx
// Class   :
// Purpose :  StackNavigation
// Date    :  2024.05
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '@feature/login/LoginScreen';
import {screenPath} from '@common/constants/screenPath';

/**
 * 스택네비게이터 컴포넌트
 * @returns React.JSX.Element
 */
const Stack = createStackNavigator();
const StackNavigation = () => {
  const webViewPathName = screenPath.webView;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* 로그인 스크린 */}
        <Stack.Screen
          name={webViewPathName.login}
          component={LoginScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
