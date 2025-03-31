import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import TabNavigation from '@shared/navigation/TabNavigation';
import {RootStackParams} from '@shared/interface/rootStackParams';
// import PrepareRunScreen from '@features/prepareRun/screen';
import DrawerNavigation from '../DrawerNavigation';
import PrepareRunScreen from '@features/prepareRun/screen';
import RunTrackerScreen from '@features/runTracker/screen/RunTrackerScreen';

/**
 * 스택네비게이터 컴포넌트
 * @returns React.JSX.Element
 */
const StackNavigation = () => {
  const Stack = createStackNavigator<RootStackParams>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="drawer"
        screenOptions={{
          headerShown: false,
        }}>
        {/* <Stack.Screen name={'tab'} component={TabNavigation} /> */}
        <Stack.Screen name={'drawer'} component={DrawerNavigation} />
        <Stack.Screen
          name={'prepareRunScreen'}
          component={PrepareRunScreen}
          options={() => ({
            headerShown: false,
            animationEnabled: false,
            cardOverlayEnabled: false,
          })}
        />
        <Stack.Screen
          name={'runTrackerScreen'}
          component={RunTrackerScreen}
          options={() => ({
            headerShown: false,
            animationEnabled: false,
            cardOverlayEnabled: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
