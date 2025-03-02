import styled from '@emotion/native';
import React from 'react';

interface ILabel {
  text: string;
  style?: object;
}

/**
 * label 컴포넌트
 * @property { string } text 라벨 텍스트
 * @property { object } style 라벨 스타일
 * @returns React.JSX.Element
 */
const Label = ({text, style}: ILabel) => {
  return (
    <View>
      <Text style={style}>{text}</Text>
    </View>
  );
};

export default Label;

const View = styled.View`
  align-items: center;
`;

const Text = styled.Text``;
