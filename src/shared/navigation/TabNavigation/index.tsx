import React, {useMemo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import RunScreen from '@features/run/screen/RunScreen';
import {colors} from '@shared/styles/theme';
import {SvgIcon, Label} from '@shared/components/atoms';
import useNavigationStore from '@shared/store/navigationStore';
import * as Icons from '@shared/constants/icons';
import {HeaderButton} from '@shared/components/molecules';
import {RecordStack} from '@shared/navigation/Stack';
import {RootStackParams} from '@shared/interface/rootStackParams';

/** 탭 네이게이션 */
const TabNavigation = () => {
  const Tab = createBottomTabNavigator<RootStackParams>();

  /** 탭 아이콘 컴포넌트 */
  const tabIcon = useMemo(() => {
    return (focused: boolean, name: keyof typeof Icons) => {
      const opacity = focused ? 1 : 0.5;
      return (
        <SvgIcon
          size={18}
          name={name}
          stroke={'none'}
          color={colors.text_000}
          fill={colors.bg_gray000}
          opacity={opacity}
        />
      );
    };
  }, []);

  /** 탭 라벨 스타일 */
  const tabLabelStyle = useMemo(() => {
    return (focused: boolean) => {
      return {
        color: colors.text_333,
        opacity: focused ? 1 : 0.5,
        fontSize: 11,
      };
    };
  }, []);

  /** 탭바표시 여부 */
  const isTabShowStatus = useNavigationStore(state => state.isTabShowStatus);

  /** 탭 바 표시  */
  const isShowTabBar = useMemo(() => {
    return isTabShowStatus ? 'flex' : 'none';
  }, [isTabShowStatus]);

  return (
    <Tab.Navigator
      initialRouteName={'runScreen'}
      screenOptions={({}) => ({
        headerShown: isTabShowStatus,
        tabBarAllowFontScaling: false,
        headerTitleAllowFontScaling: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontStyle: 'normal',
          fontSize: 18,
          fontWeight: '400',
          lineHeight: 22,
          color: colors.bg_gray000,
        },
        tabBarStyle: {
          height: 40,
          backgroundColor: colors.bg_gray000,
          borderTopWidth: 0,
          margin: 0,
          padding: 0,
          display: isShowTabBar,
        },
        headerStyle: {
          backgroundColor: colors.bg_gray000,
        },
      })}>
      {/* 기록 탭 */}
      <Tab.Screen
        name={'recordStack'}
        component={RecordStack}
        options={{
          headerShown: false,
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
        name={'runScreen'}
        component={RunScreen}
        options={() => ({
          tabBarLabel: ({focused}) => {
            return <Label text="러닝" style={tabLabelStyle(focused)} />;
          },
          tabBarIcon: ({focused}) => {
            return tabIcon(focused, 'run');
          },
          headerLeft: () => {
            return <HeaderButton iconName="profile" />;
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
