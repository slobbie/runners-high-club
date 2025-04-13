import React, {useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {IRoutineForm} from '@shared/interface/routine.interface';
import RoutineItemComponent from '@features/workoutRoutineForm/components/RoutineItemComponent';

interface IProps {
  routineFormData: IRoutineForm[];
  editHandler: (item: IRoutineForm) => void;
}

/**
 * 운동 리스트 컴포넌트
 */
const RoutineCard = ({routineFormData, editHandler}: IProps) => {
  const keyExtractor = useCallback(
    (item: IRoutineForm) => item.id.toString(),
    [],
  );

  const handleEdit = useCallback(
    (item: IRoutineForm) => editHandler(item),
    [editHandler],
  );

  const renderItem = useCallback(
    ({item}: {item: IRoutineForm}) => (
      <RoutineItemComponent item={item} onEdit={handleEdit} />
    ),
    [handleEdit],
  );

  return (
    <FlatList
      data={routineFormData}
      style={styles.flatList}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

export default RoutineCard;

const styles = StyleSheet.create({
  flatList: {
    width: '100%',
  },
});
