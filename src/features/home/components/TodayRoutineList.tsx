import styled from '@emotion/native';
import React from 'react';
import {FlatList} from 'react-native';

import TodayTaskCard from '@features/home/components/TodayTaskCard';
import {IRoutineForm} from '@shared/interface/routine.interface';
import EmptyRoutine from '@features/home/components/EmptyRoutine';

interface IProps {
  todayRoutine: IRoutineForm[];
}

/**
 * 오늘의 루틴
 */
const TodayRoutineList = ({todayRoutine}: IProps) => {
  return (
    <MainContent>
      <FlatList
        data={todayRoutine}
        ListHeaderComponent={<TasksTitle>오늘의 루틴</TasksTitle>}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <EmptyRoutine
            title={'오늘의 루틴이 없습니다'}
            description={'루틴을 등록하고 오늘의 운동을 시작해보세요'}
          />
        }
        renderItem={({item, index}: {item: IRoutineForm; index: number}) => {
          return (
            <RoutineListContainer>
              <TodayTaskCard item={item} itemIndex={index} />
            </RoutineListContainer>
          );
        }}
      />
    </MainContent>
  );
};

export default TodayRoutineList;

const MainContent = styled.View({
  flex: 1,
  padding: 20,
});

const RoutineListContainer = styled.View({
  marginBottom: 24,
});

const TasksTitle = styled.Text({
  fontSize: 18,
  fontWeight: '600',
  color: '#ffffff',
  marginTop: 32,
  marginBottom: 16,
});
