import React from 'react';
import styled from '@emotion/native';
import {PressableProps} from 'react-native';

interface IProps extends PressableProps {
  children: React.ReactNode;
}

/**
 * 기본 버튼 컴포넌트
 * @property { number } size % 단위
 * @property { string } buttonColor 버튼 컬러 기본 컬러 = #5dadd9
 * @property { React.ReactNode } children
 * @returns React.JSX.Element
 */
const ButtonBase = ({children, ...rest}: IProps) => {
  return <Button {...rest}>{children}</Button>;
};

export default ButtonBase;

const Button = styled.Pressable({
  alignItems: 'center',
  justifyContent: 'center',
});
