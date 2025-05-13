import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {RootStackParams} from '@shared/interface/rootStackParams';
import WorkoutScreen from '@features/workout/screen';
import WorkoutRoutineFormScreen from '@features/workoutRoutineForm/screen';
import HomeScreen from '@features/home/screen';
import StatisticsScreen from '@features/statistics/screen';
import {colors} from '@shared/styles/theme';

const StackNavigation = () => {
  const Stack = createStackNavigator<RootStackParams>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="homeScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name={'workoutScreen'}
          component={WorkoutScreen}
          options={() => ({
            headerShown: false,
            headerTitleAllowFontScaling: false,
          })}
        />
        <Stack.Screen
          name={'workoutRoutineFormScreen'}
          component={WorkoutRoutineFormScreen}
          options={() => ({
            headerShown: false,
            headerTitleAllowFontScaling: false,
          })}
        />
        <Stack.Screen
          name={'homeScreen'}
          component={HomeScreen}
          options={() => ({
            headerShown: false,
            headerTitleAllowFontScaling: false,
            headerTitleStyle: {
              color: colors.bg_gray000,
              fontSize: 18,
            },
            headerStyle: {
              backgroundColor: colors.text_gray9,
            },
          })}
        />
        <Stack.Screen
          name={'statisticsScreen'}
          component={StatisticsScreen}
          options={() => ({
            headerShown: false,
            headerTitleAllowFontScaling: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
