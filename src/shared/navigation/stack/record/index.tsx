import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import RecordScreen from '@features/record/screen/RecordScreen';
import RecordDetailScreen from '@features/record/screen/RecordDetailScreen';
import {HeaderButton} from '@shared/components/molecules';
import {RootStackParams} from '@shared/interface/rootStackParams';

/**
 * 기록 화면 스택
 * @returns React.JSX.Element
 */
const RecordStack = () => {
  const Stack = createStackNavigator<RootStackParams>();

  return (
    <Stack.Navigator
      initialRouteName={'recordScreen'}
      screenOptions={{
        headerTitle: '',
      }}>
      <Stack.Screen
        name={'recordScreen'}
        component={RecordScreen}
        options={({}) => ({
          headerLeft: () => {
            return <HeaderButton iconName="profile" />;
          },
        })}
      />
      <Stack.Screen
        name={'recordDetailScreen'}
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
