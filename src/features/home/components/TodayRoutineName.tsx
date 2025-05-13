import React from 'react';
import styled from '@emotion/native';

import {weekdaysInKo} from '@shared/constants/weekdaysInKo';

interface IProps {
  workoutName: string;
}

const TodayRoutineName = ({workoutName}: IProps) => {
  return (
    <DateSection>
      <DateInfo>
        <DateSubtitle>{weekdaysInKo[new Date().getDay()]}</DateSubtitle>
        <DateTitle>오늘 - {workoutName || '오늘의 루틴'}</DateTitle>
      </DateInfo>
    </DateSection>
  );
};

export default TodayRoutineName;

const DateSection = styled.View({
  marginBottom: 24,
});

const DateInfo = styled.View({});

const DateSubtitle = styled.Text({
  fontSize: 14,
  color: '#888888',
  marginBottom: 4,
});

const DateTitle = styled.Text({
  fontSize: 24,
  fontWeight: '700',
  color: '#ffffff',
});
