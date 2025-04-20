import React from 'react';
import styled from '@emotion/native';

import {SvgIcon, Typo} from '@shared/components/atoms';
import {colors} from '@shared/styles/theme';

interface IProps {
  isRoutineFormDataEmpty: boolean;
  showFormHandler: () => void;
}

/**
 * 루틴 추가 버튼
 */
const RoutineAddButton = ({
  isRoutineFormDataEmpty,
  showFormHandler,
}: IProps) => {
  return (
    <AddView>
      {isRoutineFormDataEmpty && (
        <>
          <Typo fontSize={16} fontWeight={400} color={colors.text_gray0}>
            새로운 운동을 추가해보세요
          </Typo>
        </>
      )}
      <AddButton onPress={showFormHandler}>
        <SvgIcon name="icon_add" size={60} />
      </AddButton>
    </AddView>
  );
};

export default RoutineAddButton;

const AddView = styled.View({
  width: '100%',
  alignItems: 'center',
  gap: 10,
  position: 'absolute',
  bottom: 80,
});

const AddButton = styled.Pressable(({theme}) => ({
  width: 60,
  height: 60,
  backgroundColor: theme.colors.primary,
  borderRadius: 100,
  justifyContent: 'center',
  alignItems: 'center',
}));
