import React, {memo} from 'react';
import styled from '@emotion/native';

import {IRoutineForm} from '@shared/interface/routine.interface';
import {colors} from '@shared/styles/theme';
import {SvgIcon, Typo} from '@shared/components/atoms';

const RoutineItemComponent = memo(
  ({
    item,
    onEdit,
  }: {
    item: IRoutineForm;
    onEdit: (item: IRoutineForm) => void;
  }) => (
    <RoutineItem>
      <Typo fontSize={16} fontWeight={600} color={"#1a1a1a"}>
        종목: {item.title}
      </Typo>
      <Typo fontSize={16} fontWeight={600} color={"#1a1a1a"}>
        세트: {item.rep}
      </Typo>
      <Typo fontSize={16} fontWeight={600} color={"#1a1a1a"}>
        무게: {item.weight}
      </Typo>
      <Typo fontSize={16} fontWeight={600} color={"#1a1a1a"}>
        휴식: {item.restDuration.label}
      </Typo>
      <DeleteButton onPress={() => onEdit(item)}>
        <SvgIcon name="icon_edit" size={24} color="#1a1a1a" />
      </DeleteButton>
    </RoutineItem>
  ),
);

export default RoutineItemComponent;

const RoutineItem = styled.View({
  width: '100%',
  paddingHorizontal: 16,
  paddingVertical: 15,
  marginBottom: 0,
  alignItems: 'flex-start',
  gap: 10,
});

const DeleteButton = styled.TouchableOpacity(({}) => ({
  borderRadius: 100,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  right: 16,
  top: 16,
}));
