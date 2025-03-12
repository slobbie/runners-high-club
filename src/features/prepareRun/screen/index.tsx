import useBackBgStore from '@shared/store/backBgStore';
import {colors} from '@shared/styles/theme';
import styled from '@emotion/native';
import React, {useEffect, useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import useNavigate from '@shared/hooks/useNavigate';
import useCountdown from '@shared/hooks/useCountdown';
import {SafeAreaView} from 'react-native-safe-area-context';

/**
 * 달리기 준비 단계 스크린
 * @returns React.JSX.Element
 */
const PrepareRunScreen = () => {
  // const {setSafeAreaViewBg} = useBackBgStore();
  const navigation = useNavigate();

  const [count, startCountdown] = useCountdown(3);

  /** 카운터 종료후 출발 텍스트 노출 여부 */
  const [isCompleteText, setIsSetCompleteText] = useState(true);

  const opacity = useSharedValue(0);
  const animatedViewWidth = useSharedValue(30);
  const animatedViewHeight = useSharedValue(15);
  const animatedViewRadius = useSharedValue(1000);
  const animatedViewTop = useSharedValue(30);
  const animatedViewOpacity = useSharedValue(1);

  /** 카운트 애니메이션 */
  useEffect(() => {
    opacity.value = withTiming(1, {duration: 250});

    const resetAnimation = setTimeout(() => {
      opacity.value = withTiming(0, {duration: 400});
    }, 500);

    return () => clearTimeout(resetAnimation);
  }, [opacity, count]);

  /** 카운터 시작시 view 애니메이션 */
  useEffect(() => {
    console.log('여기가 시작이야 ? :');
    animatedViewWidth.value = withTiming(animatedViewWidth.value + 70, {
      duration: 150,
    });
    animatedViewHeight.value = withTiming(animatedViewHeight.value + 85, {
      duration: 200,
    });
    animatedViewTop.value = withTiming(animatedViewTop.value - 30, {
      duration: 150,
    });
    animatedViewRadius.value = withTiming(animatedViewRadius.value - 1000, {
      duration: 150,
    });
  }, [
    animatedViewHeight,
    animatedViewRadius,
    animatedViewTop,
    animatedViewWidth,
  ]);

  const opacityBg = useSharedValue(1);

  /** 카운터 종료 시 view 애니메이션 */
  useEffect(() => {
    if (count === 0) {
      setIsSetCompleteText(() => {
        return true;
      });
      setTimeout(() => {
        setIsSetCompleteText(() => {
          return false;
        });
        /** 노치바 색상 변경 */
        // setSafeAreaViewBg(colors.bg_gray000);
        opacityBg.value = withTiming(0, {duration: 100});
        animatedViewTop.value = withTiming(animatedViewTop.value + 78, {
          duration: 150,
        });
        animatedViewWidth.value = withSpring(animatedViewWidth.value - 75, {
          duration: 150,
        });
        animatedViewHeight.value = withSpring(animatedViewHeight.value - 85, {
          duration: 150,
        });
        animatedViewRadius.value = withSpring(animatedViewRadius.value + 1000, {
          duration: 150,
        });

        navigation.navigate('runTrackerScreen');
      }, 500);
    }
  }, [
    animatedViewHeight,
    animatedViewRadius,
    animatedViewTop,
    animatedViewWidth,
    count,
  ]);

  /** View 애니메이션 스타일 */
  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedViewWidth.value}%`,
      height: `${animatedViewHeight.value}%`,
      borderRadius: animatedViewRadius.value,
      top: `${animatedViewTop.value}%`,
      opacity: opacityBg.value,
    };
  });

  /** 전체 영역 애니메이션 스타일 */
  const animatedWrapperStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedViewOpacity.value,
    };
  });

  /** 텍스트 애니메이션 스타일 */
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  /** 카운트 다운 이벤트 */
  useEffect(() => {
    startCountdown();
  }, []);

  return (
    <AnimatedWrapper style={animatedWrapperStyle}>
      <AnimatedView style={[animatedViewStyle]}>
        {count > 0 ? (
          <AnimatedCountText style={[animatedTextStyle]}>
            {count}
          </AnimatedCountText>
        ) : (
          isCompleteText && <AnimatedCountText>출발 !</AnimatedCountText>
        )}
      </AnimatedView>
    </AnimatedWrapper>
  );
};

export default PrepareRunScreen;

const Wrapper = styled.View`
  /* position: absolute; */
  width: 100%;
  height: 100%;
  /* z-index: 1000; */
  background-color: transparent;
  /* background-color: blue; */
  align-items: center;

  justify-content: 'center';
`;

const CounterView = styled.View`
  /* position: absolute; */
  /* z-index: 2000; */
  background-color: ${({theme}) => theme.colors.warning};
  justify-content: center;
  align-items: center;
`;

const CountText = styled.Text`
  font-size: 100px;
  font-weight: bold;
  margin-bottom: 20%;
  color: ${({theme}) => theme.colors.bg_gray000};
`;

const AnimatedWrapper = Animated.createAnimatedComponent(Wrapper);

const AnimatedView = Animated.createAnimatedComponent(CounterView);

const AnimatedCountText = Animated.createAnimatedComponent(CountText);
