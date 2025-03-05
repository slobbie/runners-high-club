import React, {useEffect, useRef, useState} from 'react';
import {
  AppState,
  AppStateStatus,
  Keyboard,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import styled from '@emotion/native';
import useDevicePermissions, {
  TPermission,
} from '@shared/hooks/useDevicePermissions';
import Geolocation from '@react-native-community/geolocation';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

import services from '@shared/constants/services';
import EditKmItem from '@features/run/components/EditKmItem';
import ControlButtonGroup from '@features/run/components/ControlButtonGroup';
import PrepareRun from '@features/run/components/PrepareRun';
// import CompleteRun from '@features/run/components/CompleteRun';
import useBackBgStore from '@shared/store/backBgStore';
import {colors} from '@shared/styles/theme';
// import useNavigationStore from '@shared/store/navigationStore';
import {BottomSheetContainer} from '@shared/components/atoms';
import MapView from '@features/run/components/MapView';
import useNavigate from '@shared/hooks/useNavigate';
import {Header} from '@shared/components/organisms';
import {HeaderIconButton} from '@shared/components/molecules';
import {SafeAreaView} from 'react-native-safe-area-context';

/**
 * 달리기 측정 화면
 * @returns React.JSX.Element
 */
const RunScreen = () => {
  const navigation = useNavigate();
  const {setSafeAreaViewBg} = useBackBgStore();
  // const {setIsTabShowStatus} = useNavigationStore();

  /** 디바이스 권한 훅스 */
  const permissions = useDevicePermissions();

  /** 로케이션 권한 상수  */
  const location = services.storage.permission.location as TPermission;

  /** 바텀시트 ref */
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  /** 달리기 시작 여부 */
  const [isRun, setIsRun] = useState(false);

  /** 목표 km 상태 */
  const [kmText, setKmText] = useState('3.00');

  /** 앱 백그라운드 상태 감지 */
  const [appState, setAppState] = useState(AppState.currentState);

  /** 달리기 완료 기록 컴포넌트 표시 여부 */
  // const [isShowCompleted, setIsShowCompleted] = useState(false);

  /** 현재 위치 상태 */
  const [markerPosition, setMarkerPosition] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });

  /** 현재 위치 상태 */
  const [pathPosition, setPathPosition] = useState<
    {
      latitude: number;
      longitude: number;
    }[]
  >([
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

  /** 일시정지 상태 */
  const [isPause, setIsPause] = useState(false);

  /** 준비 단계 표시 여부 */
  const [isPrepareRun, setIsPrepareRun] = useState(false);

  /** 준비 단계 카운터 */
  const [runCount, setRunCount] = useState(3);

  /** 달리기 완료 컴포넌트 컨트롤러 */
  const runCompleteEvent = () => {
    // setIsShowCompleted(() => {
    //   return false;
    // });
    /** 러닝 종료시 거리 초기화 */
    setMarkerPosition({
      latitude: 0,
      longitude: 0,
    });
    setPathPosition([
      {
        latitude: 0,
        longitude: 0,
      },
    ]);
    // setIsTabShowStatus(true);
  };

  /** 달리기 시작 핸들러 */
  const startRunHandler = () => {
    if (isRun) {
      setIsRun(() => {
        return false;
      });
      // setIsPause(() => {
      //   return false;
      // });

      navigation.navigate('completeRunScreen', {
        pathPosition,
        markerPosition,
      });
      runCompleteEvent();
    } else {
      prepareRun();
    }
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

  /** 로케이션 권한 검사 이펙트 */
  useEffect(() => {
    if (!isPermissionsState) {
      (async () => {
        const isPermissions = await permissions.getDevicePermission(
          location,
          '러닝 측정을 위해선 권한 허용이 필요합니다.',
        );
        setIsPermissionsState(isPermissions as boolean);
      })();
    }
  }, [isPermissionsState, location, permissions]);

  // TODO: 1초에 한번씩 호출 해주어 셋팅하면됨
  /** 현재 디바이스 위치 호출 */
  useEffect(() => {
    if (isPermissionsState) {
      Geolocation.getCurrentPosition(
        info => {
          setMarkerPosition({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          });
          setPathPosition(() => {
            return [
              {
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
              },
            ];
          });
        },
        console.error,
        {
          enableHighAccuracy: true,
          timeout: 20000,
        },
      );
    }
  }, [isPermissionsState]);

  /** 백그라운드 에서 다시 앱으로 돌아왔을 시 실행 */
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        if (!isPermissionsState) {
          (async () => {
            const isPermissions = await permissions.getDevicePermission(
              location,
              '러닝 측정을 위해선 권한 허용이 필요합니다.',
            );
            setIsPermissionsState(isPermissions as boolean);
          })();
        }
      }
      setAppState(nextAppState);
    };
    AppState.addEventListener('change', handleAppStateChange);
  }, [appState, isPermissionsState, location, permissions]);

  /** 임시 주행 데이터 */
  useEffect(() => {
    if (isRun && !isPause) {
      const updatePosition = () => {
        setMarkerPosition(prev => ({
          ...prev,
          latitude: prev.latitude + 0.00005,
          longitude: prev.longitude + 0.000001,
        }));
        setPathPosition(prev => {
          return [
            ...prev,
            {
              latitude: prev[prev.length - 1].latitude + 0.00005,
              longitude: prev[prev.length - 1].longitude + 0.000001,
            },
          ];
        });

        re = setTimeout(updatePosition, 1000);
      };
      let re = setTimeout(updatePosition, 1000);
      return () => {
        clearTimeout(re);
      };
    }
  }, [isPause, isRun]);

  /** 달리기 준비 단계  */
  const prepareRun = () => {
    setSafeAreaViewBg(colors.warning);
    setIsPrepareRun(true);
  };

  /** 달리기 준비 단계 */
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isRun && isPrepareRun && runCount > 0) {
      interval = setInterval(() => {
        setRunCount(prevCount => prevCount - 1);
      }, 1000);
    } else if (runCount === 0) {
      setTimeout(() => {
        setSafeAreaViewBg(colors.bg_gray000);
        setRunCount(3);
        setIsPrepareRun(false);
        navigation.navigate('runTrackerScreen');
      }, 650);
    }

    return () => clearInterval(interval);
  }, [isPrepareRun, runCount, setSafeAreaViewBg]);

  /** 일시정지 핸들러 */
  const pauseHandler = () => {
    setIsPause(prev => !prev);
  };

  return (
    <>
      {isPrepareRun && <PrepareRun runCount={runCount} />}
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
        <ControlButtonGroup
          isPause={isPause}
          isRun={isRun}
          settingHandler={settingHandler}
          startRunHandler={startRunHandler}
          prepareRunHandler={prepareRun}
          pauseHandler={pauseHandler}
        />
      </SafeView>

      <BottomSheetContainer snapPoint="90%" ref={bottomSheetModalRef}>
        <EditKmItem
          onPress={closeBottomsheet}
          onChange={onChangeKm}
          inputValue={kmText}
        />
      </BottomSheetContainer>
    </>
  );
};

export default RunScreen;

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
