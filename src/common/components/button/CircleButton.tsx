// =============================================================================
// File    :  CircleButton.tsx
// Class   :
// Purpose :  CircleButton
// Date    :  2024.05
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================
import React, {forwardRef} from 'react';
import styled from '@emotion/native';
import {TouchableOpacityProps} from 'react-native';

interface ICircleButton extends TouchableOpacityProps {
  size?: number;
  buttonColor?: string;
  children: React.ReactNode;
}

/**
 *  서클 버튼 컴포넌트
 * @property { number } size 설명
 * @property { string } buttonColor 버튼 컬러 기본 컬러 = #5dadd9
 * @property { React.ReactNode } children
 * @returns React.JSX.Element
 */
const CircleButton = forwardRef<any, ICircleButton>(
  ({size = 50, buttonColor = '#5dadd9', children, ...rest}, ref) => {
    return (
      <Button ref={ref} {...rest} $size={size} $buttonColor={buttonColor}>
        {children}
      </Button>
    );
  },
);

export default CircleButton;

const Button = styled.Pressable<{$size: number; $buttonColor: string}>`
  width: ${props => `${props.$size}px`};
  height: ${props => `${props.$size}px`};
  background-color: ${props => props.$buttonColor};
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;
