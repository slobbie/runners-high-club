import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ButtonBase, Typo} from '@shared/components/atoms';
import useNavigate from '@shared/hooks/useNavigate';

interface IProps {
  onClose: () => void;
}

const DrawerMenu = ({onClose}: IProps) => {
  const navigation = useNavigate();

  return (
    <DrawerContentScrollView>
      <SafeAreaView>
        <ButtonBase
          onPress={() => {
            onClose();
            navigation.navigate('workoutRoutineFormScreen');
          }}>
          <Typo fontSize={22}>운동 추가</Typo>
        </ButtonBase>
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};

export default DrawerMenu;
