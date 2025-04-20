import React from 'react';
import styled from '@emotion/native';
import {TouchableOpacity} from 'react-native';

import {Header} from '@shared/components/organisms';
import {SvgIcon, Typo} from '@shared/components/atoms';

interface IProps {
  setIsDrawerOpen: (value: React.SetStateAction<boolean>) => void;
}

const HomeHeader = ({setIsDrawerOpen}: IProps) => {
  return (
    <Header
      headerLeft={
        <ToDayView>
          <Typo fontSize={16} fontWeight={'bold'}>
            Monday
          </Typo>
          <Typo fontSize={16} fontWeight={'bold'}>
            13
          </Typo>
        </ToDayView>
      }
      headerRight={
        <TouchableOpacity
          onPress={() => {
            setIsDrawerOpen(true);
          }}>
          <SvgIcon name="icon_menu" size={24} fill={'#fff'} stroke={'#fff'} />
        </TouchableOpacity>
      }
    />
  );
};

export default HomeHeader;

const ToDayView = styled.View({
  flexDirection: 'row',
  gap: 4,
});
