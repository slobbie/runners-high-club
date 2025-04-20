import * as React from 'react';
import styled from '@emotion/native';
import {StyleProp, View, ViewStyle} from 'react-native';
import Animated, {AnimatedStyle} from 'react-native-reanimated';

import {ANDROID} from '@shared/constants/platform';

interface IProps {
  animatedStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  headerLeft?: any;
  headerTitle?: any;
  headerRight?: any;
  isAbsolute?: boolean;
  paddingVertical?: number;
}

const Header = ({
  headerLeft = null,
  headerTitle = null,
  headerRight = null,
  isAbsolute,
  animatedStyle,
  paddingVertical = 10,
}: IProps) => {
  return (
    <HeaderView
      paddingVertical={paddingVertical}
      style={animatedStyle}
      isAbsolute={isAbsolute}>
      <HeaderLeft>{headerLeft ? headerLeft : <></>}</HeaderLeft>
      <HeaderTitle>{headerTitle ? headerTitle : <></>}</HeaderTitle>
      <HeaderRight>{headerRight ? headerRight : <></>}</HeaderRight>
    </HeaderView>
  );
};

export default Header;

const HeaderView = styled(Animated.createAnimatedComponent(View))<{
  isAbsolute?: boolean;
  paddingVertical: number;
}>(({isAbsolute, paddingVertical}) => ({
  width: '100%',
  position: isAbsolute ? 'absolute' : 'relative',
  paddingHorizontal: 24,
  height: 50,
  paddingTop: ANDROID ? paddingVertical + 8 : paddingVertical,
  paddingBottom: paddingVertical,
  flexDirection: 'row',
  justifyContent: 'space-between',
  ...(isAbsolute && {zIndex: 1}),
}));

const HeaderLeft = styled.View({
  alignSelf: 'flex-start',
  alignItems: 'center',
  justifyContent: 'center',
});

const HeaderTitle = styled.View({
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
});

const HeaderRight = styled.View({
  alignSelf: 'flex-end',
  alignItems: 'center',
  justifyContent: 'center',
});
