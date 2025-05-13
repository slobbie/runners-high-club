import styled from '@emotion/native';
import React, {useEffect} from 'react';
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
  nextSetHandler: () => void;
  isRest?: boolean;
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
  nextSetHandler,
  isRest,
}: IRunButtonGroup) => {
  /** 왼쪽 버튼 사이즈  */
  const leftButtonSize = useSharedValue(80);
  /** 왼쪽 버튼  TranslateX - 초기에는 중앙에 있도록 */
  const leftTranslateX = useSharedValue<number>(10);
  /** 오른쪽 버튼  TranslateX - 초기에는 중앙에 있도록 */
  const rightTranslateX = useSharedValue<number>(0);
  /** 종료 버튼  TranslateX - 초기에는 중앙에 있도록 */
  const endTranslateX = useSharedValue<number>(-10);

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

  // 중앙 버튼 사이즈 애니메이션 스타일
  const centerButtonStyle = useAnimatedStyle(() => {
    return {
      width: isRest ? 70 : 60,
      height: isRest ? 70 : 60,
      backgroundColor: isRest ? colors.success : colors.primary,
      zIndex: isRest ? 3000 : 1000,
    };
  });

  /** 버튼 애니메이션  */
  useEffect(() => {
    // 휴식 모드일 때는 다른 버튼 레이아웃 적용
    if (isRest) {
      // 버튼 크기 변경 먼저 시작
      leftButtonSize.value = withSpring(0, {
        duration: 150,
      });
      
      // 약간의 지연 후 위치 변경 시작
      setTimeout(() => {
        leftTranslateX.value = withTiming(-10, {
          duration: 200,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
        
        // 중앙 버튼은 그대로 유지
        rightTranslateX.value = withTiming(0, {
          duration: 200,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
        
        // 종료 버튼 숨기기
        endTranslateX.value = withTiming(10, {
          duration: 200,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
      }, 50);
    }
    // 일시정지 모드일 때의 애니메이션
    else if (isPause) {
      // 전체 버튼 연겹 표시
      leftButtonSize.value = withSpring(60, {
        duration: 300,
      });
      
      setTimeout(() => {
        leftTranslateX.value = withTiming(-10, {
          duration: 200,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
        
        rightTranslateX.value = withTiming(0, {
          duration: 200,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
        
        endTranslateX.value = withTiming(10, {
          duration: 200,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
      }, 50);
    } 
    // 기본 운동 모드 애니메이션
    else {
      // 운동 모드로 복귀 시 버튼들이 중앙에서 양쪽으로 펼쳐지는 애니메이션
      // 왼쪽 버튼은 왼쪽으로 이동
      leftTranslateX.value = withTiming(-10, {
        duration: 200,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
      
      // 중앙 버튼은 중앙에 유지
      rightTranslateX.value = withTiming(0, {
        duration: 200,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
      
      // 오른쪽 버튼은 오른쪽으로 이동
      endTranslateX.value = withTiming(10, {
        duration: 200,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
      
      // 위치 변경 후 크기 조정
      setTimeout(() => {
        leftButtonSize.value = withSpring(64, {
          duration: 300,
          damping: 15,  // 움직임 더 부드럽게
        });
      }, 200);
    }
  }, [isPause, isRest]);

  return (
    <ButtonWrapper>
      <ButtonBox>
        {/* 일시정지/재개 버튼 - 휴식 모드에서는 숨김 */}
        <ButtonSpaceLeft>
          {!isRest && (
            <AnimatedLeftView style={leftButtonAnimatedStyle}>
              <AnimatedCircleButton
                style={[leftButtonStyle, {backgroundColor: colors.warning}]}
                onPress={pauseHandler}>
                <SvgIcon
                  name={isPause ? 'icon_refresh' : 'pause'}
                  color={colors.bg_gray000}
                  fill={colors.bg_gray000}
                  stroke={colors.bg_gray000}
                />
              </AnimatedCircleButton>
            </AnimatedLeftView>
          )}
        </ButtonSpaceLeft>
        
        {/* 중앙 다음 버튼 */}
        <ButtonSpaceCenter>
          <AnimatedCenterView style={rightButtonAnimatedStyle}>
            <AnimatedCircleButton
              style={centerButtonStyle}
              onPress={nextSetHandler}>
              <SvgIcon
                name="icon_arrow_circle_right"
                size={isRest ? 40 : 36}
                stroke="#fff"
              />
            </AnimatedCircleButton>
          </AnimatedCenterView>
        </ButtonSpaceCenter>
        
        {/* 종료 버튼 - 휴식 모드에서는 숨김 */}
        <ButtonSpaceRight>
          {!isRest && (
            <AnimatedRightView style={endButtonAnimatedStyle}>
              <AnimatedCircleButton
                style={[leftButtonStyle, {backgroundColor: colors.danger}]}
                onPress={endRunCallback}>
                <SvgIcon name="stop" size={24} stroke="#fff" />
              </AnimatedCircleButton>
            </AnimatedRightView>
          )}
        </ButtonSpaceRight>
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
  width: 280px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
`;

// 왼쪽 버튼 영역
const ButtonSpaceLeft = styled.View`
  width: 70px;
  height: 80px;
  justify-content: center;
  align-items: center;
`;

// 중앙 버튼 영역
const ButtonSpaceCenter = styled.View`
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
`;

// 오른쪽 버튼 영역
const ButtonSpaceRight = styled.View`
  width: 70px;
  height: 80px;
  justify-content: center;
  align-items: center;
`;

const BottomLeftView = styled.View`
  z-index: 3000;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const BottomCenterView = styled.View`
  z-index: 2000;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const BottomRightView = styled.View`
  z-index: 1000;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const AnimatedCircleButton = Animated.createAnimatedComponent(ButtonCircle);

const AnimatedLeftView = Animated.createAnimatedComponent(BottomLeftView);

const AnimatedCenterView = Animated.createAnimatedComponent(BottomCenterView);

const AnimatedRightView = Animated.createAnimatedComponent(BottomRightView);
