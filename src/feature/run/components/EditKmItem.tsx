// =============================================================================
// File    :  EditKmItem.tsx
// Class   :
// Purpose :  EditKmItem
// Date    :  2024.05
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================
import React from 'react';
import styled from '@emotion/native';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';

interface IEditKmItem {
  onPress: () => void;
  inputValue: string;
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

/**
 * 런 스크린 바텀 시트 아이템 컴포넌ㅌ
 * @property { () => void } onPress
 * @property { string } inputValue
 * @property { (e: NativeSyntheticEvent<TextInputChangeEventData>) => void; } onChange 설명
 * @returns React.JSX.Element
 */
const EditKmItem = ({onPress, inputValue, onChange}: IEditKmItem) => {
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

export default EditKmItem;

const EditCloseText = styled.Text``;

const EditKmBox = styled.View`
  top: 8%;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const EditKmText = styled.Text`
  color: #5c5c5c;
  font-size: 14px;
  font-weight: 400;
  top: 6%;
  margin: 0 auto;
`;

const EditKmTextInput = styled.TextInput`
  color: #333;
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
