import {ColorValue} from 'react-native';

export interface ITypoProps {
  lineHeight?: number;
  color?: ColorValue;
  fontSize?: number;
  fontWeight?: 600 | 400 | 'bold';
  letterSpacing?: number;
  textAlign?: 'center' | 'left' | 'right';
}
