import styled from '@emotion/native';
import React, {useMemo, useState} from 'react';

import {colors} from '@shared/styles/theme';
import useNavigationStore from '@shared/store/navigationStore';
import {ButtonCircle, SvgIcon} from '@shared/components/atoms';

interface IRunButtonGroup {
  settingHandler: () => void;
  prepareRunHandler: () => void;
}

/**
 * 달리기 준비 단계 버튼 그룹 컴포넌트
 */
const SetupButtonGroup = ({
  settingHandler,
  prepareRunHandler,
}: IRunButtonGroup) => {
  const {setIsTabShowStatus} = useNavigationStore();
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

  /** 달리기 이벤트 컨트롤러 */
  const runController = () => {
    setIsTabShowStatus(false);
    prepareRunHandler();
  };

  return (
    <ButtonWrapper>
      <ButtonBox>
        <Left>
          <ButtonCircle onPress={settingHandler} size={40} buttonColor="#fff">
            <SvgIcon name="setting" size={24} />
          </ButtonCircle>
        </Left>
        <Mid>
          <BottomLeftView>
            <ButtonCircle
              size={80}
              onPress={runController}
              buttonColor={colors.primary}>
              <SvgIcon
                name={'play'}
                size={60}
                color={colors.bg_gray000}
                fill={colors.bg_gray000}
                stroke={colors.bg_gray000}
              />
            </ButtonCircle>
          </BottomLeftView>
        </Mid>
        <Right>
          <ButtonCircle onPress={soundHandler} size={40} buttonColor="#fff">
            <SvgIcon name={soundIconName} size={26} />
          </ButtonCircle>
        </Right>
      </ButtonBox>
    </ButtonWrapper>
  );
};
export default SetupButtonGroup;

const ButtonWrapper = styled.View({
  flex: 0.5,
  alignItems: 'center',
  justifyContent: 'center',
});

const ButtonBox = styled.View`
  z-index: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const BottomLeftView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Left = styled.View`
  flex: 1;
  align-items: center;
`;

const Mid = styled.View`
  flex: 1;
  align-items: center;
`;

const Right = styled.View`
  flex: 1;
  align-items: center;
`;
