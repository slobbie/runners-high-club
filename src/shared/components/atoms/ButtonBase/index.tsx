import React from 'react';
import {PressableProps} from 'react-native';
import styled from '@emotion/native';

interface IProps extends PressableProps {
  children: React.ReactNode;
  buttonColor?: string;
}

/**
 * 기본 버튼 컴포넌트
 * @property { number } size % 단위
 * @property { string } buttonColor 버튼 컬러 기본 컬러 = #5dadd9
 * @property { React.ReactNode } children
 * @returns React.JSX.Element
 */
const ButtonBase = ({children, buttonColor = '#5dadd9', ...rest}: IProps) => {
  return (
    <Button {...rest} buttonColor={buttonColor}>
      {children}
    </Button>
  );
};

export default ButtonBase;

const Button = styled.Pressable<{buttonColor: string}>(({buttonColor}) => ({
  width: '100%',
  height: 56,
  backgroundColor: buttonColor,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
}));
