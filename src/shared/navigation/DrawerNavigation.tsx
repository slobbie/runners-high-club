import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigation from '@shared/navigation/TabNavigation';
import {screenPath} from '@shared/constants/screenPath';
import {colors} from '@shared/styles/theme';

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();
  const navigationName = screenPath.navigation;
  return (
    <Drawer.Navigator
    // drawerContent={props => <MenuScreen {...props} />}
    >
      <Drawer.Screen
        name={navigationName.tab}
        component={TabNavigation}
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
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
