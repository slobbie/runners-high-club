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
import {screenPath} from '@common/constants/screenPath';
import RunScreen from '@feature/run/RunScreen';
import SvgIcon from '@common/components/icon/SvgIcon';
import Label from '@common/components/label/Label';
import * as Icons from '@common/components/icon/index';
import HeaderProfileButton from '@navigation/components/HeaderProfileButton';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/store/store';
import RecordStack from '@navigation/stack/record/RecordStack';

export type RootTabParamList = {
  home: undefined;
};

/** 탭 네이게이션 */
const TabNavigation = () => {
  const Tab = createBottomTabNavigator<RootTabParamList>();
  const pathName = screenPath.feature;

  /** 탭 아이콘 컴포넌트 */
  const tabIcon = useMemo(() => {
    return (focused: boolean, name: keyof typeof Icons) => {
      const opacity = focused ? 1 : 0.5;
      return (
        <SvgIcon
          size={18}
          name={name}
          stroke={'none'}
          color="#000"
          fill={'#fff'}
          opacity={opacity}
        />
      );
    };
  }, []);

  /** 탭 라벨 스타일 */
  const tabLabelStyle = useMemo(() => {
    return (focused: boolean) => {
      return {
        color: '#333',
        opacity: focused ? 1 : 0.5,
        fontSize: 11,
      };
    };
  }, []);

  /** 탭바표시 여부 */
  const isTabShowStatus = useSelector(
    (state: RootState) => state.navigation.isTabShowStatus,
  );

  /** 탭 바 표시  */
  const isShowTabBar = useMemo(() => {
    return isTabShowStatus ? 'flex' : 'none';
  }, [isTabShowStatus]);

  return (
    <Tab.Navigator
      initialRouteName={pathName.run as keyof RootTabParamList}
      screenOptions={{
        headerShown: isTabShowStatus,
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
          display: isShowTabBar,
        },
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerLeft: () => <HeaderProfileButton />,
      }}>
      {/* 기록 탭 */}
      <Tab.Screen
        name={pathName.record.recordStack as keyof RootTabParamList}
        component={RecordStack}
        options={{
          tabBarLabel: ({focused}) => {
            return <Label text="기록" style={tabLabelStyle(focused)} />;
          },
          tabBarIcon: ({focused}) => {
            return tabIcon(focused, 'barChart');
          },
        }}
      />
      {/* 달리기 탭 */}
      <Tab.Screen
        name={pathName.run as keyof RootTabParamList}
        component={RunScreen}
        options={{
          tabBarLabel: ({focused}) => {
            return <Label text="러닝" style={tabLabelStyle(focused)} />;
          },
          tabBarIcon: ({focused}) => {
            return tabIcon(focused, 'run');
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
