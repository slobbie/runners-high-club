import React from 'react';
import styled from '@emotion/native';
import {PressableProps} from 'react-native';

import {SvgIcon} from '@shared/components/atoms';
import * as Icons from '@shared/constants/icons';

interface IHeaderButton extends PressableProps {
  iconName: keyof typeof Icons;
}

/**
 *  Header 버튼
 * @returns React.JSX.Element
 */
const HeaderButton = ({iconName, ...rest}: IHeaderButton) => {
  return (
    <Button {...rest}>
      <SvgIcon name={iconName} size={20} fill={'#333'} stroke={'#333'} />
    </Button>
  );
};

export default HeaderButton;

const Button = styled.Pressable`
  width: 50px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
