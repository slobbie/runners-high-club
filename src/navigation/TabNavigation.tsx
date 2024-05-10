// =============================================================================
// File    :  TabNavigation.tsx
// Class   :
// Purpose :  TabNavigation
// Date    :  2024.05
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@feature/home/HomeScreen';
import {screenPath} from '@common/constants/screenPath';

export type RootTabParamList = {
  home: undefined;
};

/** 탭 네이게이션 */
const TabNavigation = () => {
  const Tab = createBottomTabNavigator<RootTabParamList>();
  const pathName = screenPath.feature;
  return (
    <Tab.Navigator
      initialRouteName={pathName.home as keyof RootTabParamList}
      screenOptions={{
        tabBarAllowFontScaling: false,
        headerTitleAllowFontScaling: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'BrunoAce-Regular',
          fontStyle: 'normal',
          fontSize: 18,
          fontWeight: '400',
          lineHeight: 22,
          color: '#fff',
        },
        tabBarStyle: {
          height: 60,
          backgroundColor: '#1D1D1F',
          borderTopWidth: 0,
          margin: 0,
          padding: 0,
        },
        tabBarLabelStyle: {
          color: '#fff',
          // paddingBottom: tabPaddingBottom(windowWidth),
          fontSize: 14,
        },
        tabBarActiveTintColor: '#049CBE',
        tabBarActiveBackgroundColor: '#049CBE',
        headerStyle: {
          backgroundColor: '#1C2632',
        },
        // headerLeft: () => <TabHeaderBackButton />,
      }}>
      {/* 홈 탭 */}
      <Tab.Screen
        name={pathName.home as keyof RootTabParamList}
        component={HomeScreen}
        options={{
          title: 'rhc',
          headerTitleAlign: 'center',
          tabBarLabel: '메인',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
