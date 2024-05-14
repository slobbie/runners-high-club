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

import React, {useMemo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@feature/home/HomeScreen';
import {screenPath} from '@common/constants/screenPath';
import RunScreen from '@feature/run/RunScreen';
import SvgIcon from '@common/components/icon/SvgIcon';
import Label from '@common/components/label/Label';
import * as Icons from '@common/components/icon/index';

export type RootTabParamList = {
  home: undefined;
};

/** 탭 네이게이션 */
const TabNavigation = () => {
  const Tab = createBottomTabNavigator<RootTabParamList>();
  const pathName = screenPath.feature;

  const icon = useMemo(() => {
    return (focused: boolean, name: keyof typeof Icons) => {
      const opacity = focused ? 1 : 0.5;
      return (
        <SvgIcon
          size={18}
          name={name}
          stroke={'none'}
          fill={'#fff'}
          opacity={opacity}
        />
      );
    };
  }, []);

  const LabelStyle = useMemo(() => {
    return (focused: boolean) => {
      return {
        color: '#333',
        opacity: focused ? 1 : 0.5,
        fontSize: 11,
      };
    };
  }, []);
  return (
    <Tab.Navigator
      initialRouteName={pathName.home as keyof RootTabParamList}
      screenOptions={{
        tabBarAllowFontScaling: false,
        headerTitleAllowFontScaling: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontStyle: 'normal',
          fontSize: 18,
          fontWeight: '400',
          lineHeight: 22,
          color: '#fff',
        },
        tabBarStyle: {
          height: 40,
          backgroundColor: '#fff',
          borderTopWidth: 0,
          margin: 0,
          padding: 0,
        },
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
          tabBarLabel: ({focused}) => {
            return <Label text="기록" style={LabelStyle(focused)} />;
          },
          tabBarIcon: ({focused}) => {
            return icon(focused, 'barChart');
          },
        }}
      />
      <Tab.Screen
        name={pathName.run as keyof RootTabParamList}
        component={RunScreen}
        options={{
          title: 'rhc',
          headerTitleAlign: 'center',
          tabBarLabel: ({focused}) => {
            return <Label text="러닝" style={LabelStyle(focused)} />;
          },
          tabBarIcon: ({focused}) => {
            return icon(focused, 'run');
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
