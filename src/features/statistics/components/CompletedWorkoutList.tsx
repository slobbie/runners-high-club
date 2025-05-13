import React from 'react';
import {Animated, useWindowDimensions} from 'react-native';
import styled from '@emotion/native';
import {SlideInRight} from 'react-native-reanimated';

import {SvgIcon, Typo} from '@shared/components/atoms';
import {colors} from '@shared/styles/theme';

// 완료된 운동 아이템 인터페이스
interface ICompletedWorkout {
  id: string | number;
  title: string;
  date: string;
  duration: string;
  exercises: {
    name: string;
    sets: string;
    weight: string;
  }[];
}

// 샘플 데이터 - 나중에 스토어나 API에서 가져올 수 있습니다
const sampleCompletedWorkouts: ICompletedWorkout[] = [
  {
    id: 1,
    title: '상체 운동',
    date: '2025-04-15',
    duration: '45분',
    exercises: [
      {name: '벤치 프레스', sets: '4세트', weight: '70kg'},
      {name: '덤벨 숄더 프레스', sets: '3세트', weight: '20kg'},
    ],
  },
  {
    id: 2,
    title: '하체 운동',
    date: '2025-04-18',
    duration: '60분',
    exercises: [
      {name: '스쿼트', sets: '4세트', weight: '80kg'},
      {name: '레그 프레스', sets: '3세트', weight: '120kg'},
      {name: '레그 익스텐션', sets: '3세트', weight: '45kg'},
    ],
  },
];

const CompletedWorkoutList = () => {
  const {width} = useWindowDimensions();

  // 완료된 운동이 없을 때 표시할 빈 화면
  if (sampleCompletedWorkouts.length === 0) {
    return (
      <EmptyContainer>
        <SvgIcon name="icon_menu" size={48} fill={colors.text_gray2} />
        <EmptyText>
          <Typo fontSize={16} fontWeight={400} color={colors.text_gray0}>
            완료한 운동이 없습니다
          </Typo>
        </EmptyText>
      </EmptyContainer>
    );
  }

  // 운동 카드 렌더링
  const renderWorkoutCard = (item: ICompletedWorkout, index: number) => {
    const backgroundColor = getRandomColor(index);

    return (
      <WorkoutCard key={item.id} style={{backgroundColor}}>
        <CardHeader>
          <WorkoutTitle>
            <Typo fontSize={18} fontWeight={'bold'} color={colors.text_gray0}>
              {item.title}
            </Typo>
          </WorkoutTitle>
          <WorkoutMetaInfo>
            <Typo fontSize={14} color={colors.text_gray1}>
              {item.date} · {item.duration}
            </Typo>
          </WorkoutMetaInfo>
        </CardHeader>

        <ExerciseList>
          {item.exercises.map((exercise, idx) => (
            <ExerciseItem key={idx}>
              <ExerciseName>
                <Typo fontSize={16} fontWeight={600} color={colors.text_gray0}>
                  {exercise.name}
                </Typo>
              </ExerciseName>
              <ExerciseDetails>
                <Typo fontSize={14} color={colors.text_gray1}>
                  {exercise.sets} · {exercise.weight}
                </Typo>
              </ExerciseDetails>
            </ExerciseItem>
          ))}
        </ExerciseList>
      </WorkoutCard>
    );
  };

  return (
    <Container>
      <ListContent>
        {sampleCompletedWorkouts.map((item, index) =>
          renderWorkoutCard(item, index),
        )}
      </ListContent>
    </Container>
  );
};

// 색상 배열에서 랜덤 색상 선택 (인덱스 기준)
const getRandomColor = (index: number) => {
  // 검정 계열의 어두운 색상 사용
  const colors = [
    '#1A1A1A', // 진한 검정
    '#222222', // 어두운 회색
    '#2A2A2A', // 중간 어두운 회색
    '#333333', // 보통 회색
    '#3A3A3A', // 밝은 어두운 회색
  ];
  return colors[index % colors.length];
};

// 스타일 컴포넌트
const Container = styled.ScrollView({
  flex: 1,
  backgroundColor: '#121212',
});

const ListContent = styled.View({
  padding: 16,
  gap: 16,
});

const WorkoutCard = styled.View({
  borderRadius: 16,
  overflow: 'hidden',
  marginBottom: 16,
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.2,
  shadowRadius: 3,
});

const CardHeader = styled.View({
  padding: 16,
  borderBottomWidth: 1,
  borderBottomColor: 'rgba(255, 255, 255, 0.1)',
});

const WorkoutTitle = styled.View({
  marginBottom: 8,
});

const WorkoutMetaInfo = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
});

const ExerciseList = styled.View({
  padding: 16,
});

const ExerciseItem = styled.View({
  marginBottom: 12,
});

const ExerciseName = styled.View({
  marginBottom: 4,
});

const ExerciseDetails = styled.View({
  flexDirection: 'row',
});

const EmptyContainer = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 24,
});

const EmptyText = styled.View({
  marginTop: 16,
});

export default CompletedWorkoutList;
