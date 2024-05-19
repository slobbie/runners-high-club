// =============================================================================
// File    :  RunButtonGroup.tsx
// Class   :
// Purpose :  RunButtonGroup
// Date    :  2024.05
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import styled from '@emotion/native';
import React, {useMemo, useState} from 'react';
import CircleButton from '@common/components/button/CircleButton';
import SvgIcon from '@common/components/icon/SvgIcon';

interface IRunButtonGroup {
  isRun: boolean;
  startRunHandler: () => void;
  settingHandler: () => void;
}

/**
 * 런 스크린 버튼 그룹 컴포넌트
 * @property { boolean } isRun 달리기 시작 여부
 * @property { startRunHandler } startRunHandler 달리기 시작 함수
 * @property { settingHandler } settingHandler 셋팅 바텀시트 호출 함수
 * @returns React.JSX.Element
 */
const RunButtonGroup = ({
  isRun,
  startRunHandler,
  settingHandler,
}: IRunButtonGroup) => {
  /** 사운드 버튼 사용 여부 */
  const [isSound, setIsSound] = useState(true);

  /** 사운드 버튼 핸들러 */
  const soundHandler = () => {
    setIsSound(prev => !prev);
  };

  /** 사운드 아이콘  */
  const soundIconName = useMemo(() => {
    return isSound ? 'soundMax' : 'soundMin';
  }, [isSound]);

  /** 달리기 label  */
  const runLabel = useMemo(() => {
    return isRun ? 'Stop' : 'Run';
  }, [isRun]);

  return (
    <ButtonWrapper>
      <ButtonBox>
        <CircleButton onPress={settingHandler} size={40} buttonColor="#fff">
          <SvgIcon name="setting" size={24} />
        </CircleButton>
        <CircleButton onPress={startRunHandler} size={80}>
          <ButtonText>{runLabel}</ButtonText>
        </CircleButton>
        <CircleButton onPress={soundHandler} size={40} buttonColor="#fff">
          <SvgIcon name={soundIconName} size={26} />
        </CircleButton>
      </ButtonBox>
    </ButtonWrapper>
  );
};
export default RunButtonGroup;

const ButtonWrapper = styled.View`
  z-index: 100;
  width: 100%;
  height: 20%;
  position: absolute;
  bottom: 5%;
  align-items: center;
  justify-content: center;
`;

const ButtonBox = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;
