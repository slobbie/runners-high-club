import React from 'react';
import styled from '@emotion/native';
import {PressableProps} from 'react-native';

interface IProps extends PressableProps {
  children: React.ReactNode;
  size?: number;
  buttonColor?: string;
}

/**
 * 기본 버튼 컴포넌트
 * @property { number } size % 단위
 * @property { string } buttonColor 버튼 컬러 기본 컬러 = #5dadd9
 * @property { React.ReactNode } children
 * @returns React.JSX.Element
 */
const ButtonBase = ({
  children,
  size = 100,
  buttonColor = '#5dadd9',
  ...rest
}: IProps) => {
  return (
    <Button {...rest} $size={size} $buttonColor={buttonColor}>
      {children}
    </Button>
  );
};

export default ButtonBase;

const Button = styled.Pressable<{$size: number; $buttonColor: string}>`
  width: ${props => props.$size}%;
  height: 50px;
  background-color: ${props => props.$buttonColor};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;
