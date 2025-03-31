import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {colors} from '@shared/styles/theme';
import HomeScreen from '@features/home/screen';
import DrawerMenu from '@shared/components/organisms/DrawerMenu';
import WorkoutScreen from '@features/workout/screen';
import WorkoutRoutineFormScreen from '@features/workoutRoutineForm/screen';

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="homeScreen"
      drawerContent={props => <DrawerMenu {...props} />}>
      <Drawer.Screen
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
      <Drawer.Screen
        name={'workoutScreen'}
        component={WorkoutScreen}
        options={() => ({
          headerShown: false,
          headerTitleAllowFontScaling: false,
        })}
      />
      <Drawer.Screen
        name={'workoutRoutineFormScreen'}
        component={WorkoutRoutineFormScreen}
        options={() => ({
          headerShown: false,
          headerTitleAllowFontScaling: false,
        })}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
