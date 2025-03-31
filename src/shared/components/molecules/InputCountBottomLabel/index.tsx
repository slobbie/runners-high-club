import styled from '@emotion/native';
import React from 'react';
import {TextInputProps} from 'react-native';
import {Space, Typo} from '@shared/components/atoms';
import {colors} from '@shared/styles/theme';

interface IProps extends TextInputProps {
  label: string;
}

const InputLabel = ({label, ...props}: IProps) => {
  return (
    <Content>
      <Typo color={colors.text_gray0} fontSize={22} fontWeight={'bold'}>
        {label}
      </Typo>
      <Space bottom={10} />
      <TitleInput placeholderTextColor={colors.text_gray10} {...props} />
    </Content>
  );
};

export default InputLabel;

const Content = styled.View({
  width: '100%',
  minHeight: 76,
  alignItems: 'flex-start',
});

const TitleInput = styled.TextInput(({theme}) => ({
  width: '100%',
  height: 52,
  backgroundColor: theme.colors.bg_3B3B46,
  borderRadius: 14,
  paddingHorizontal: 16,
  paddingVertical: 15,
  color: theme.colors.text_gray0,
  fontSize: 16,
}));
