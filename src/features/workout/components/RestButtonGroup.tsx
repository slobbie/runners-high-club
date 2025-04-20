import styled from '@emotion/native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {colors} from '@shared/styles/theme';
import {ButtonCircle, SvgIcon} from '@shared/components/atoms';

interface IRunButtonGroup {
  // endRunCallback: () => void;
  // pauseHandler: () => void;
  // isPause?: boolean;
  nextSetHandler: () => void;
}

/**
 * 런 스크린 버튼 그룹 컴포넌트
 * @property { boolean } isRun 달리기 시작 여부
 * @property { boolean } isPause 달리기 일시정지 여부
 * @property { () => void } endRunCallback 달리기 종료 콜백 함수
 * @property { () => void } pauseHandler 달리기 임시정지 함수
 * @returns React.JSX.Element
 */
const RestButtonGroup = ({nextSetHandler}: IRunButtonGroup) => {
  /** 오른쪽 버튼  TranslateX */
  const rightTranslateX = useSharedValue<number>(0);

  /** 오른쪽 버튼 view 애니메이션 스타일  */
  const rightButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: rightTranslateX.value}],
    };
  });

  return (
    <ButtonWrapper>
      <ButtonBox>
        <Mid>
          <AnimatedCenterView style={rightButtonAnimatedStyle}>
            <AnimatedCircleButton
              onPress={nextSetHandler}
              size={60}
              buttonColor={colors.primary}>
              <SvgIcon
                name="icon_arrow_circle_right"
                size={36}
                stroke={'#fff'}
              />
            </AnimatedCircleButton>
          </AnimatedCenterView>
        </Mid>
      </ButtonBox>
    </ButtonWrapper>
  );
};

export default RestButtonGroup;

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

const BottomCenterView = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
});

const Mid = styled.View`
  flex: 1;
  align-items: center;
`;

const AnimatedCircleButton = Animated.createAnimatedComponent(ButtonCircle);

const AnimatedCenterView = Animated.createAnimatedComponent(BottomCenterView);
