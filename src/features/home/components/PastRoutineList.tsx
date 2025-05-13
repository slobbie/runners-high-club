import React from 'react';
import styled from '@emotion/native';
import {FlatList} from 'react-native';

import TodayTaskCard from '@features/home/components/TodayTaskCard';
import {IRoutines} from '@shared/interface/routine.interface';
import {weekdaysInKo} from '@shared/constants/weekdaysInKo';
import EmptyRoutine from '@features/home/components/EmptyRoutine';

interface IProps {
  otherRoutines: IRoutines[];
}

/**
 * 다른 루틴 리스트
 */
const PastRoutineList = ({otherRoutines}: IProps) => {
  const getDayName = (day: number) => {
    return weekdaysInKo[day];
  };

  return (
    <MainContent>
      <FlatList
        data={otherRoutines}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <EmptyRoutine
            title={'다른 루틴이 없습니다'}
            description={'다양한 요일의 운동 루틴을 추가해보세요'}
          />
        }
        renderItem={({item}) => (
          <RoutineContainer>
            <RoutineDayHeader>
              <RoutineDayTitle>{getDayName(item.day)} 루틴</RoutineDayTitle>
            </RoutineDayHeader>

            <FlatList
              data={item.routines}
              keyExtractor={routine => routine.id.toString()}
              renderItem={({item: routineItem, index}) => (
                <TodayTaskCard item={routineItem} itemIndex={index} />
              )}
              scrollEnabled={false}
            />
          </RoutineContainer>
        )}
      />
    </MainContent>
  );
};

export default PastRoutineList;

const MainContent = styled.View({
  flex: 1,
  padding: 20,
});

const RoutineContainer = styled.View({
  marginBottom: 28,
});

const RoutineDayHeader = styled.View({
  marginBottom: 12,
});

const RoutineDayTitle = styled.Text({
  fontSize: 18,
  fontWeight: '600',
  color: '#ffffff',
});
