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
import {screenPath} from '@common/constants/screenPath';
import {createStackNavigator} from '@react-navigation/stack';
import RecordScreen from '@feature/record/screen/RecordScreen';
import RecordDetailScreen from '@feature/record/screen/RecordDetailScreen';
import {RootStackParamList} from '@/navigation/StackNavigation';
import HeaderButton from '@/navigation/components/HeaderButton';

/**
 * 기록 화면 스택
 * @returns React.JSX.Element
 */
const RecordStack = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const pathName = screenPath.feature.record;

  return (
    <Stack.Navigator
      initialRouteName={pathName.record as keyof RootStackParamList}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={pathName.record as keyof RootStackParamList}
        component={RecordScreen}
      />
      <Stack.Screen
        name={pathName.recordDetail as keyof RootStackParamList}
        component={RecordDetailScreen}
        options={({navigation}) => ({
          headerLeft: () => {
            const goBack = () => {
              navigation.goBack();
            };
            return <HeaderButton onPress={goBack} iconName="arrowPrev" />;
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default RecordStack;
