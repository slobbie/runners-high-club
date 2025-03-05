import styled from '@emotion/native';
import {ANDROID} from '@shared/constants/platform';
import * as React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Animated, {AnimatedStyle} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

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
      edges={['top']}
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

const HeaderView = styled(Animated.createAnimatedComponent(SafeAreaView))<{
  isAbsolute?: boolean;
  paddingVertical: number;
}>(({isAbsolute, paddingVertical}) => ({
  width: '100%',
  position: isAbsolute ? 'absolute' : 'relative',
  paddingHorizontal: 18,
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
