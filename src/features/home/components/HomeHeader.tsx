import React from 'react';
import styled from '@emotion/native';
import {Pressable} from 'react-native';

import {SvgIcon} from '@shared/components/atoms';
import TodayRoutineName from '@features/home/components/TodayRoutineName';

interface IProps {
  setIsDrawerOpen: (value: boolean) => void;
  workoutName: string;
}

/**
 * 홈 헤더
 */
const HomeHeader = ({setIsDrawerOpen, workoutName}: IProps) => {
  return (
    <TopSection>
      <HeaderRow>
        <Pressable onPress={() => setIsDrawerOpen(true)}>
          <SvgIcon name="icon_menu" size={28} color="#ffffff" />
        </Pressable>
      </HeaderRow>

      <TodayRoutineName workoutName={workoutName} />
    </TopSection>
  );
};

export default HomeHeader;

const TopSection = styled.View({
  padding: 20,
  paddingBottom: 10,
});

const HeaderRow = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 24,
});
