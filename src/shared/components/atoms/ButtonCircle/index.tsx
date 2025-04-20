import React, {forwardRef} from 'react';
import styled from '@emotion/native';
import {PressableProps, View} from 'react-native';

interface ICircleButton extends PressableProps {
  children: React.ReactNode;
}

/**
 *  커스텀 버튼
 */
const ButtonCustom = forwardRef<View, ICircleButton>(
  ({children, ...rest}, ref) => {
    return (
      <Button ref={ref} {...rest}>
        {children}
      </Button>
    );
  },
);

export default ButtonCustom;

const Button = styled.Pressable({
  borderRadius: 100,
  alignItems: 'center',
  justifyContent: 'center',
});
