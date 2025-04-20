import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {SlideInRight} from 'react-native-reanimated';

import {IRoutineForm} from '@shared/interface/routine.interface';
import TodayRoutineCard from '@features/home/components/TodayRoutineCard';

interface IProps {
  routineFormData: IRoutineForm[];
}

const TodayRoutineList = ({routineFormData}: IProps) => {
  const keyExtractor = useCallback(
    (item: IRoutineForm) => item.id.toString(),
    [],
  );

  const renderItem = useCallback(
    ({item, index}: {item: IRoutineForm; index: number}) => (
      <TodayRoutineCard item={item} index={index} />
    ),
    [],
  );

  return (
    <Animated.FlatList
      data={routineFormData}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      style={styles.flatList}
      keyExtractor={keyExtractor}
      itemLayoutAnimation={SlideInRight.duration(600)}
      renderItem={renderItem}
    />
  );
};

export default TodayRoutineList;

const styles = StyleSheet.create({
  contentContainer: {
    gap: 10,
    paddingBottom: 30,
    paddingHorizontal: 24,
  },
  flatList: {
    flex: 1,
  },
});
