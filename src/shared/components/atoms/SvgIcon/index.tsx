import React from 'react';
import {SvgProps} from 'react-native-svg';
import * as Icons from '@shared/constants/icons';

export type IconProps = SvgProps & {
  name: keyof typeof Icons;
  size?: number;
};

/**
 *  svg 아이콘 컴포넌트
 * @property { string } name 아이콘 이름
 * @property { number } size 아이콘 사이즈
 * @property { SvgProps } SvgProps svg 공통 옵션
 * @returns React.JSX.Element
 */
const SvgIcon = ({name, size, ...props}: IconProps) => {
  const Comp = Icons[name];

  const sizeProps = {
    width: size,
    height: size,
  };

  return <Comp {...props} {...sizeProps} />;
};

export default SvgIcon;
