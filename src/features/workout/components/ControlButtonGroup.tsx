import styled from '@emotion/native';
import React, {useEffect, useMemo} from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {colors} from '@shared/styles/theme';
import {ButtonCircle, SvgIcon} from '@shared/components/atoms';

interface IRunButtonGroup {
  endRunCallback: () => void;
  pauseHandler: () => void;
  isPause?: boolean;
}

/**
 * 런 스크린 버튼 그룹 컴포넌트
 * @property { boolean } isRun 달리기 시작 여부
 * @property { boolean } isPause 달리기 일시정지 여부
 * @property { () => void } endRunCallback 달리기 종료 콜백 함수
 * @property { () => void } pauseHandler 달리기 임시정지 함수
 * @returns React.JSX.Element
 */
const ControlButtonGroup = ({
  endRunCallback,
  pauseHandler,
  isPause,
}: IRunButtonGroup) => {
  /** 왼쪽 버튼 사이즈  */
  const leftButtonSize = useSharedValue(80);
  /** 왼쪽 버튼  TranslateX */
  const leftTranslateX = useSharedValue<number>(0);
  /** 오른쪽 버튼  TranslateX */
  const rightTranslateX = useSharedValue<number>(0);
  /** 종료 버튼  TranslateX */
  const endTranslateX = useSharedValue<number>(0);

  /** 왼쪽 버튼 view 애니메이션 스타일  */
  const leftButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: leftTranslateX.value}],
    };
  });

  /** 종료 버튼 view 애니메이션 스타일  */
  const endButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: endTranslateX.value}],
    };
  });

  /** 오른쪽 버튼 view 애니메이션 스타일  */
  const rightButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: rightTranslateX.value}],
    };
  });

  /** 왼쪽 버튼  애니메이션 스타일  */
  const leftButtonStyle = useAnimatedStyle(() => {
    return {
      width: leftButtonSize.value,
      height: leftButtonSize.value,
    };
  });

  /** 버튼 애니메이션  */
  useEffect(() => {
    if (isPause) {
      leftButtonSize.value = withSpring(60, {
        duration: 400,
      });
      leftTranslateX.value = withTiming(-80, {
        duration: 200,
        easing: Easing.linear,
      });
      rightTranslateX.value = withTiming(0, {
        duration: 200,
        easing: Easing.linear,
      });
      endTranslateX.value = withTiming(80, {
        duration: 200,
        easing: Easing.linear,
      });
    } else {
      leftTranslateX.value = withTiming(0, {
        duration: 200,
        easing: Easing.linear,
      });
      rightTranslateX.value = withTiming(0, {
        duration: 200,
        easing: Easing.linear,
      });
      setTimeout(() => {
        leftButtonSize.value = withSpring(64, {
          duration: 400,
        });
      }, 200);
    }
  }, [isPause]);

  /** run 버튼 아이콘 이름 */
  const runButtonIconName = useMemo(() => {
    if (!isPause) {
      return 'pause';
    }
    return 'play';
  }, [isPause]);

  /** run 버튼 컬러 */
  const runButtonColor = useMemo(() => {
    return isPause ? colors.warning : colors.primary;
  }, [isPause]);

  return (
    <ButtonWrapper>
      <ButtonBox>
        {/* <Left /> */}
        <Mid>
          <AnimatedLeftView style={leftButtonAnimatedStyle}>
            <AnimatedCircleButton
              style={leftButtonStyle}
              onPress={pauseHandler}
              buttonColor={runButtonColor}>
              <SvgIcon
                name={runButtonIconName}
                size={40}
                color={colors.bg_gray000}
                fill={colors.bg_gray000}
                stroke={colors.bg_gray000}
              />
            </AnimatedCircleButton>
          </AnimatedLeftView>
          <AnimatedRightView style={rightButtonAnimatedStyle}>
            <AnimatedCircleButton
              onPress={endRunCallback}
              size={60}
              buttonColor={colors.danger}>
              <SvgIcon name="stop" size={24} stroke={'#fff'} />
            </AnimatedCircleButton>
          </AnimatedRightView>
          <AnimatedLeftView style={endButtonAnimatedStyle}>
            <AnimatedCircleButton
              style={leftButtonStyle}
              onPress={pauseHandler}
              buttonColor={runButtonColor}>
              <SvgIcon
                name={runButtonIconName}
                size={40}
                color={colors.bg_gray000}
                fill={colors.bg_gray000}
                stroke={colors.bg_gray000}
              />
            </AnimatedCircleButton>
          </AnimatedLeftView>
        </Mid>
      </ButtonBox>
    </ButtonWrapper>
  );
};

export default ControlButtonGroup;

const ButtonWrapper = styled.View({
  flex: 0.5,
  alignItems: 'center',
  justifyContent: 'center',
});

const ButtonBox = styled.View`
  z-index: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const BottomLeftView = styled.View({
  zIndex: 2000,
  flexDirection: 'row',
  alignItems: 'center',
  position: 'absolute',
});

const BottomRightView = styled.View`
  z-index: 1000;
  flex-direction: row;
  align-items: center;
`;

const Mid = styled.View`
  flex: 1;
  align-items: center;
`;

const AnimatedCircleButton = Animated.createAnimatedComponent(ButtonCircle);

const AnimatedLeftView = Animated.createAnimatedComponent(BottomLeftView);

const AnimatedRightView = Animated.createAnimatedComponent(BottomRightView);
