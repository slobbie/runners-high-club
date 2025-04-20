import React, {memo, useState} from 'react';
import {StyleSheet} from 'react-native';
import styled from '@emotion/native';
import Animated, {
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import useNavigate from '@shared/hooks/useNavigate';
import {IRoutineForm} from '@shared/interface/routine.interface';
import {SvgIcon, Typo} from '@shared/components/atoms';

export interface ITodayRoutineCard {
  item: IRoutineForm;
  index: number;
}

const TodayRoutineCard = memo(({item, index}: ITodayRoutineCard) => {
  const navigation = useNavigate();

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const [startWorkout, setStartWorkout] = useState<boolean>(false);

  const scale = useSharedValue(1);

  const cardItemStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const startWorkoutStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      zIndex: 1000,
      width: '100%',
      height: '100%',
    };
  });

  const onPressIn = (pIndex: number) => {
    setCurrentIndex(pIndex);
    scale.value = withTiming(0.9);
  };

  const onPressOut = () => {
    scale.value = withTiming(1);
    setCurrentIndex(null);
    // setStartWorkout(true);
    navigation.navigate('workoutScreen');
  };

  return (
    <AnimatedCardItem
      style={[
        currentIndex === index ? cardItemStyle : undefined,
        currentIndex === index && startWorkout ? startWorkoutStyle : undefined,
        styles.bg_fff,
      ]}
      onPressIn={() => onPressIn(index)}
      onPressOut={onPressOut}
      entering={SlideInDown.duration(800).delay(100 * index)} // 추가적인 지연 효과 적용 가능
    >
      <ArrowUpRight>
        <SvgIcon name={'icon_arrow_up_right'} />
      </ArrowUpRight>
      <Typo fontSize={24} color={'#1f1f1f'} lineHeight={40} fontWeight={'bold'}>
        {item.title}
      </Typo>
      <Typo fontSize={16} color={'#1f1f1f'} lineHeight={40} fontWeight={'bold'}>
        세트간 휴식 {item.restDuration.label}
      </Typo>
      <CircleView>
        <StartView>
          <Typo
            fontSize={16}
            color={'#1f1f1f'}
            lineHeight={40}
            fontWeight={'bold'}>
            시작하기
          </Typo>
        </StartView>
      </CircleView>
    </AnimatedCardItem>
  );
});

export default TodayRoutineCard;

const styles = StyleSheet.create({
  bg_fff: {
    backgroundColor: '#fff',
  },
});

const CardItem = styled.Pressable({
  width: '100%',
  height: 200,
  paddingHorizontal: 24,
  paddingVertical: 16,
  backgroundColor: '#f3f752',
  borderRadius: 30,
});

const AnimatedCardItem = Animated.createAnimatedComponent(CardItem);

const CircleView = styled.View({
  marginTop: 'auto',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: 10,
});

const StartView = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 'auto',
});

const ArrowUpRight = styled.View({
  width: 24,
  height: 24,
  position: 'absolute',
  right: 16,
  top: 16,
});
