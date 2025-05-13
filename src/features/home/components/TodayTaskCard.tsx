import React from 'react';
import styled from '@emotion/native';
import Animated, {SlideInDown} from 'react-native-reanimated';

import {IRoutineForm} from '@shared/interface/routine.interface';
import useNavigate from '@shared/hooks/useNavigate';
import {taskColors} from '@shared/constants/taskColors';

interface IProps {
  item: IRoutineForm;
  itemIndex: number;
}

/**
 * 일정 카드
 */
const TodayTaskCard = ({item, itemIndex}: IProps) => {
  const navigation = useNavigate();

  const bgColor = taskColors[itemIndex % taskColors.length];

  return (
    <TaskCard
      bgColor={bgColor}
      entering={SlideInDown.duration(800).delay(100 * itemIndex)}>
      <TaskRow onPress={() => navigation.navigate('workoutScreen')}>
        <TaskInfo>
          <TaskTitle>{item.title}</TaskTitle>
          <TaskDetails>
            <TaskDetail>{item.rep}회</TaskDetail>
            <TaskDetail>{item.weight}kg</TaskDetail>
            <TaskDetail>휴식: {item.restDuration.label}초</TaskDetail>
          </TaskDetails>
        </TaskInfo>
        <TaskActions>
          <TaskCheckbox />
        </TaskActions>
      </TaskRow>
    </TaskCard>
  );
};

export default React.memo(TodayTaskCard);

const TaskCard = styled(Animated.View)<{
  bgColor: string;
}>(({bgColor}) => ({
  borderRadius: 16,
  overflow: 'hidden',
  marginBottom: 12,
  backgroundColor: bgColor,
}));

const TaskRow = styled.TouchableOpacity({
  flexDirection: 'row',
  alignItems: 'center',
  padding: 16,
  justifyContent: 'space-between',
});

const TaskInfo = styled.View({
  flex: 1,
});

const TaskTitle = styled.Text({
  fontSize: 16,
  fontWeight: '600',
  color: '#1A1A1A',
  marginBottom: 8,
});

const TaskDetails = styled.View({
  flexDirection: 'row',
  flexWrap: 'wrap',
});

const TaskDetail = styled.Text({
  fontSize: 13,
  color: '#1A1A1A',
  marginRight: 12,
});

const TaskActions = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
});

const TaskCheckbox = styled.View({
  width: 24,
  height: 24,
  borderRadius: 12,
  borderWidth: 2,
  borderColor: '#1A1A1A',
  marginRight: 12,
  justifyContent: 'center',
  alignItems: 'center',
});
