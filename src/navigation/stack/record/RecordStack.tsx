// =============================================================================
// File    :  RecordStack.tsx
// Class   :
// Purpose :  RecordStack
// Date    :  2024.06
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================
import React from 'react';
import {screenPath} from '@/common/constants/screenPath';
import {RootTabParamList} from '@/navigation/TabNavigation';
import {createStackNavigator} from '@react-navigation/stack';
import RecordScreen from '@/feature/record/RecordScreen';

/**
 * 기록 화면 스택
 * @returns React.JSX.Element
 */
const RecordStack = () => {
  const Stack = createStackNavigator();
  const pathName = screenPath.feature.record;

  return (
    <Stack.Navigator
      initialRouteName={pathName.record as keyof RootTabParamList}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={pathName.record as keyof RootTabParamList}
        component={RecordScreen}
      />
    </Stack.Navigator>
  );
};

export default RecordStack;
