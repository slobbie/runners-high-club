import React, {memo, useState} from 'react';
import styled from '@emotion/native';
import Animated, {
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import useNavigate from '@shared/hooks/useNavigate';
import {IRoutineForm} from '@shared/interface/routine.interface';
import {SvgIcon} from '@shared/components/atoms';
import {cardColors} from '@shared/constants/cardColors';

export interface ITodayRoutineCard {
  item: IRoutineForm;
  index: number;
}

// 다양한 운동 카드에 적용할 수 있는 색상 팔레트

const TodayRoutineCard = memo(({item, index}: ITodayRoutineCard) => {
  const navigation = useNavigate();

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const [startWorkout] = useState<boolean>(false);

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

  // 색상을 인덱스에 따라 순환해서 지정
  const getCardColor = (idx: number) => {
    const colors = Object.values(cardColors);
    return colors[idx % colors.length];
  };

  return (
    <AnimatedCardItem
      style={[
        currentIndex === index ? cardItemStyle : undefined,
        currentIndex === index && startWorkout ? startWorkoutStyle : undefined,
        {backgroundColor: getCardColor(index)},
      ]}
      onPressIn={() => onPressIn(index)}
      onPressOut={onPressOut}
      entering={SlideInDown.duration(800).delay(100 * index)}>
      {/* 운동 타이틀 섹션 */}
      <TitleSection>
        <TitleText>{item.title}</TitleText>
        {/* 다음으로 넘어가는 아이콘 */}
        <ArrowIconContainer>
          <SvgIcon name="icon_arrow_circle_right" width={24} height={24} />
        </ArrowIconContainer>
      </TitleSection>

      {/* 운동 정보 섹션 */}
      <WorkoutInfoSection>
        <InfoBlock>
          <InfoLabel>SETS</InfoLabel>
          <InfoValue>{item.rep}</InfoValue>
        </InfoBlock>
        <InfoDivider />
        <InfoBlock>
          <InfoLabel>WEIGHT</InfoLabel>
          <InfoValue>{item.weight}</InfoValue>
        </InfoBlock>
        <InfoDivider />
        <InfoBlock>
          <InfoLabel>REST</InfoLabel>
          <InfoValue>{item.restDuration.label}</InfoValue>
        </InfoBlock>
      </WorkoutInfoSection>
    </AnimatedCardItem>
  );
});

export default TodayRoutineCard;

const CardItem = styled.Pressable({
  width: '100%',
  minHeight: 170,
  paddingHorizontal: 24,
  paddingVertical: 24,
  borderRadius: 24,
  marginBottom: 14,
  gap: 16,
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
});

const AnimatedCardItem = Animated.createAnimatedComponent(CardItem);

// 운동 정보 섹션 스타일
const WorkoutInfoSection = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 16,
  paddingHorizontal: 10,
  borderColor: '#00000015',
  borderRadius: 12,
  borderWidth: 1,
  width: '100%',
});

const InfoBlock = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 4,
});

const InfoLabel = styled.Text({
  fontSize: 12,
  color: '#000000',
  opacity: 0.65,
  marginBottom: 4,
  fontWeight: '600',
  textAlign: 'center',
  letterSpacing: 0.5,
});

const InfoValue = styled.Text({
  fontSize: 22,
  fontWeight: 'bold',
  color: '#000000',
  textAlign: 'center',
  letterSpacing: -0.5, // 숫자는 조금 좀 더 조인 느낌
});

const InfoDivider = styled.View({
  width: 1,
  height: 36,
  backgroundColor: '#00000015',
  marginHorizontal: 0,
});

// 제목 섹션 스타일
const TitleSection = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 4,
});

const TitleText = styled.Text({
  fontSize: 26,
  fontWeight: 'bold',
  color: '#000000',
  letterSpacing: -0.5,
});

const ArrowIconContainer = styled.View({
  width: 24,
  height: 24,
  alignItems: 'center',
  justifyContent: 'center',
});
