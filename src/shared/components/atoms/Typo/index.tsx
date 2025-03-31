import styled from '@emotion/native';
import React from 'react';
import {TextProps} from 'react-native';

import {ITypoProps} from '@shared/interface/typo.interface';

interface IProps extends ITypoProps, TextProps {
  typoContainerFlex?: number; // typo를 감싸고 있는 view의 flex를 조절하기 위한 타입
}

const Typo = ({
  lineHeight = 130,
  fontSize,
  color,
  fontWeight,
  letterSpacing,
  typoContainerFlex,
  textAlign,
  ...props
}: IProps) => {
  return (
    <TypoView typoContainerFlex={typoContainerFlex}>
      <CustomText
        {...props}
        lineHeight={lineHeight}
        fontSize={fontSize}
        color={color}
        fontWeight={fontWeight}
        letterSpacing={letterSpacing}
        textAlign={textAlign}>
        {props.children}
      </CustomText>
    </TypoView>
  );
};

export default Typo;

const TypoView = styled.View<{typoContainerFlex?: number}>(
  ({typoContainerFlex}) => ({
    maxWidth: '100%',
    justifyContent: 'center',
    ...(typoContainerFlex && {flex: typoContainerFlex}),
  }),
);

const CustomText = styled.Text<ITypoProps>(
  ({
    // lineHeight,
    color = '#fff',
    fontSize = 13,
    fontWeight = 400,
    letterSpacing = 0,
    textAlign,
  }) => ({
    maxWidth: '100%',
    textAlignVertical: 'center',
    letterSpacing,
    // lineHeight:
    //   lineHeight ??
    //   (typeof fontSize === 'number'
    //     ? getWidth(fontSize + 2)
    //     : theme.fontsSize[fontSize] + 2),
    // lineHeight: getLineHeight(
    //   lineHeight as number,
    //   theme.fontsSize[fontSize] + 2,
    // ),
    fontSize: fontSize,
    color,
    textAlign: textAlign ?? 'left',
    // fontFamily:
    //   fontWeight === 'bold'
    //     ? theme.fontsFamily.Pretendard_Bold
    //     : fontWeight === 600
    //     ? theme.fontsFamily.Pretendard_SemiBold
    //     : theme.fontsFamily.Pretendard_Regular,
    fontWeight,
  }),
);
