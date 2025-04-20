import React from 'react';
import styled from '@emotion/native';
import Animated, {SlideInRight} from 'react-native-reanimated';

import {Typo} from '@shared/components/atoms';

const OtherRoutineTitle = () => {
  return (
    <TitleView>
      <Animated.View entering={SlideInRight.duration(600)}>
        <Typo fontSize={36} fontWeight={'bold'}>
          Other
        </Typo>
      </Animated.View>
    </TitleView>
  );
};

export default OtherRoutineTitle;

const TitleView = styled.View({
  alignItems: 'flex-start',
  gap: 10,
  paddingHorizontal: 24,
});
