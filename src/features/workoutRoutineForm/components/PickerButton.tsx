import React from 'react';
import styled from '@emotion/native';

import {ButtonBase, Space, Typo} from '@shared/components/atoms';
import {colors} from '@shared/styles/theme';

interface IProps {
  title: string;
  label: string;
  onPress: () => void;
}

/**
 *  반복 요일 버튼
 */
const PickerButton = ({title, label, onPress}: IProps) => {
  return (
    <SelectView>
      <Typo color={colors.text_gray0} fontSize={22} fontWeight={'bold'}>
        {title}
      </Typo>
      <Space bottom={10} />
      <Select onPress={onPress}>
        <Typo color={colors.text_gray0} fontSize={16} fontWeight={'bold'}>
          {label}
        </Typo>
      </Select>
    </SelectView>
  );
};

export default PickerButton;

const SelectView = styled.View({
  width: '100%',
  minHeight: 76,
  alignItems: 'flex-start',
});

const Select = styled(ButtonBase)(({theme}) => ({
  width: '100%',
  height: 52,
  alignItems: 'flex-start',
  backgroundColor: theme.colors.bg_3B3B46,
  borderRadius: 14,
  paddingHorizontal: 16,
  paddingVertical: 15,
  color: theme.colors.text_gray0,
}));
