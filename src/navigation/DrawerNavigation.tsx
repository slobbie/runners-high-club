import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigation from '@navigation/TabNavigation';
import {screenPath} from '@common/constants/screenPath';

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
            color: '#fff',
            fontSize: 18,
          },
          headerStyle: {
            backgroundColor: '#1C2632',
          },
        })}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
