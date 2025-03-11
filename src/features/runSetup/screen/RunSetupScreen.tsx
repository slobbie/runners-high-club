import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import styled from '@emotion/native';
import useDevicePermissions from '@shared/hooks/useDevicePermissions';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {SafeAreaView} from 'react-native-safe-area-context';

import SetupButtonGroup from '@features/runSetup/components/SetupButtonGroup';
import useBackBgStore from '@shared/store/backBgStore';
import {colors} from '@shared/styles/theme';
import {BottomSheetContainer} from '@shared/components/atoms';
import MapView from '@features/runSetup/components/MapView';
import useNavigate from '@shared/hooks/useNavigate';
import {Header} from '@shared/components/organisms';
import {HeaderIconButton} from '@shared/components/molecules';
import useCurrentPosition from '@shared/hooks/useCurrentPosition';
import SetupRunContent from '@features/runSetup/components/SetupRunContent';
import {IPositionBase} from '@shared/interface/run.interface';

/**
 * 달리기 준비 단계 화면
 */
const RunSetupScreen = () => {
  const navigation = useNavigate();
  const {setSafeAreaViewBg} = useBackBgStore();
  const getCurrentPosition = useCurrentPosition();

  /** 디바이스 권한  */
  const permissions = useDevicePermissions();

  /** 바텀시트 ref */
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  /** 목표 km 상태 */
  const [kmText, setKmText] = useState('3.00');

  /** 현재 위치 상태 */
  const [markerPosition, setMarkerPosition] = useState<IPositionBase>({
    latitude: 0,
    longitude: 0,
  });

  /** 현재 위치 상태 */
  const [pathPosition, setPathPosition] = useState<IPositionBase[]>([
    {
      latitude: 0,
      longitude: 0,
    },
    {
      latitude: 0,
      longitude: 0,
    },
  ]);

  /** 위치 권한 여부 */
  const [isPermissionsState, setIsPermissionsState] = useState(false);

  /** 달리기 준비 단계  */
  const prepareRun = () => {
    setSafeAreaViewBg(colors.warning);
    navigation.navigate('prepareRunScreen');
  };

  /** 셋팅 바텀시트 호출 핸들러 */
  const settingHandler = () => {
    bottomSheetModalRef.current?.present();
  };

  /** 목표 km 온체인지 이벤트 */
  const onChangeKm = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setKmText(e.nativeEvent.text);
  };

  /** 바텀 시트 닫기 이벤트 */
  const closeBottomsheet = () => {
    bottomSheetModalRef.current?.close();
    Keyboard.dismiss();
  };

  const getLocationPermission = async () => {
    const isPermissions = await permissions.getPermission(['location']);
    setIsPermissionsState(isPermissions);
  };

  const getCurrentPositionEvent = async () => {
    const position = await getCurrentPosition();
    setMarkerPosition(position);
    setPathPosition(() => {
      return [
        {
          latitude: position.latitude,
          longitude: position.longitude,
        },
      ];
    });
  };

  /** 위치 권한 체크 */
  useEffect(() => {
    if (!isPermissionsState) {
      getLocationPermission();
    }
  }, [isPermissionsState, permissions]);

  /** 현재 위치 호출 */
  useEffect(() => {
    if (isPermissionsState) {
      getCurrentPositionEvent();
    }
  }, [isPermissionsState]);

  return (
    <SafeView>
      <HeaderView>
        <Header headerLeft={<HeaderIconButton iconName="profile" />} />
      </HeaderView>

      <TitleView>
        <TitleText>러닝</TitleText>
      </TitleView>

      <KmWrapper>
        <KmBox>
          <KmText>{kmText}</KmText>
          <KmTextUnit>Km</KmTextUnit>
        </KmBox>
      </KmWrapper>

      <MapView pathPosition={pathPosition} markerPosition={markerPosition} />
      <SetupButtonGroup
        settingHandler={settingHandler}
        prepareRunHandler={prepareRun}
      />
      <BottomSheetContainer snapPoint="90%" ref={bottomSheetModalRef}>
        <SetupRunContent
          onPress={closeBottomsheet}
          onChange={onChangeKm}
          inputValue={kmText}
        />
      </BottomSheetContainer>
    </SafeView>
  );
};

export default RunSetupScreen;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  z-index: 0;
  background-color: ${({theme}) => theme.colors.bg_gray100};
  justify-content: flex-start;
  align-items: flex-start;
`;

const TitleView = styled.View({
  width: '100%',
  paddingHorizontal: 12,
  paddingVertical: 10,
});

const TitleText = styled.Text`
  font-weight: 600;
  font-size: 22px;
  color: ${({theme}) => theme.colors.text_333};
  margin-left: 5%;
`;

const KmWrapper = styled.View({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 10,
});

const KmBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
  border-bottom-width: 2px;
`;

const KmText = styled.Text`
  color: ${({theme}) => theme.colors.text_333};
  font-size: 60px;
  font-weight: bold;
`;

const KmTextUnit = styled.Text`
  color: ${({theme}) => theme.colors.text_333};
  margin-top: auto;
  margin-bottom: 2%;
  margin-left: 10px;
`;

const HeaderView = styled.View({
  height: 50,
});
