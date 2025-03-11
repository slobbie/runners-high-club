import React from 'react';
import styled from '@emotion/native';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';

interface IProps {
  onPress: () => void;
  inputValue: string;
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

/**
 * 달리기 준비 설정 컨텐츠
 */
const SetupRunContent = ({onPress, inputValue, onChange}: IProps) => {
  return (
    <>
      <EditButton onPress={onPress}>
        <EditCloseText>설정 완료</EditCloseText>
      </EditButton>
      <EditKmText>거리를 설정하여 목표를 향해 달려보세요!</EditKmText>
      <EditKmBox>
        <EditKmTextInput
          keyboardType="decimal-pad"
          value={inputValue}
          onChange={onChange}
        />
        <KmUnitText>Km</KmUnitText>
      </EditKmBox>
    </>
  );
};

export default SetupRunContent;

const EditCloseText = styled.Text``;

const EditKmBox = styled.View`
  top: 8%;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const EditKmText = styled.Text`
  color: ${({theme}) => theme.colors.text_gray3};
  font-size: 14px;
  font-weight: 400;
  top: 6%;
  margin: 0 auto;
`;

const EditKmTextInput = styled.TextInput`
  color: ${({theme}) => theme.colors.text_333};
  font-size: 60px;
  font-weight: bold;
  border-bottom-width: 2px;
`;

const KmUnitText = styled.Text`
  top: 4%;
`;

const EditButton = styled.TouchableOpacity`
  margin-left: auto;
  margin-right: 5%;
  margin-top: 4%;
`;
