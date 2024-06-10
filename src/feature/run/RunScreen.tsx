// =============================================================================
// File    :  RunScreen.tsx
// Class   :
// Purpose :  RunScreen
// Date    :  2024.05
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import React, {useEffect, useMemo, useRef, useState} from 'react';
import styled from '@emotion/native';
import NaverMapView, {Marker, Path} from 'react-native-nmap';
import useDevicePermissions, {TPermission} from '@hooks/useDevicePermissions';
import Geolocation from '@react-native-community/geolocation';
import services from '@common/constants/services';
import {
  AppState,
  AppStateStatus,
  Keyboard,
  NativeSyntheticEvent,
  StyleProp,
  TextInputChangeEventData,
  ViewStyle,
} from 'react-native';
import Bottomsheet from '@common/components/bottomsheet/Bottomsheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import EditKmItem from '@feature/run/components/EditKmItem';
import RunButtonGroup from '@feature/run/components/RunButtonGroup';
import CircleButton from '@/common/components/button/CircleButton';

/**
 * 달리기 측정 화면
 * @returns React.JSX.Element
 */
const RunScreen = () => {
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

  /** 네이버 맵뷰 스타일 */
  const naverMapViewStyle = useMemo(() => {
    return {
      width: '100%',
      height: '50%',
    } as StyleProp<ViewStyle>;
  }, []);

  /** 네이버 맵뷰 스타일 */
  const runNaverMapViewStyle = useMemo(() => {
    return {
      width: '100%',
      height: '100%',
    } as StyleProp<ViewStyle>;
  }, []);

  /** 달리기 시작 핸들러 */
  const startRunHandler = () => {
    if (isRun) {
      setIsRun(() => {
        return false;
      });
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
    if (isRun) {
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
  }, [isRun]);

  const [isPrepareRun, setIsPrepareRun] = useState(false);

  const [runCount, setRunCount] = useState(3);

  const prepareRun = () => {
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
        setRunCount(3);
        setIsPrepareRun(false);
        setIsRun(prev => !prev);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPrepareRun, isRun, runCount]);

  return (
    <>
      <RunView>
        <Top>
          <KmTextView>
            <RunKmText>0.00</RunKmText>
            <RunKmTextUnit>Km</RunKmTextUnit>
          </KmTextView>
          <RunMapView>
            <NaverMapView
              style={runNaverMapViewStyle}
              zoomControl={false}
              center={{
                zoom: 15.7,
                // 지도 기울기
                tilt: 0,
                latitude:
                  (pathPosition[pathPosition.length - 1].latitude +
                    pathPosition[pathPosition.length - 1].latitude) /
                  2,
                longitude:
                  (pathPosition[pathPosition.length - 1].longitude +
                    pathPosition[pathPosition.length - 1].longitude) /
                  2,
              }}>
              {/* 시작점 */}
              <Marker
                coordinate={{
                  latitude: pathPosition[0].latitude,
                  longitude: pathPosition[0].longitude,
                }}
                width={1}
                height={1}
                pinColor="transparent"
                anchor={{x: 0.5, y: 0.5}}
              />
              <Path
                width={10}
                color={'#40C576'}
                outlineWidth={0}
                coordinates={pathPosition}
              />
              <Marker
                coordinate={{
                  latitude: markerPosition.latitude,
                  longitude: markerPosition.longitude,
                }}
                width={12}
                height={12}
                pinColor={'green'}
                image={require('../../assets/pngIcon/blue-dot.png')}
              />
            </NaverMapView>
          </RunMapView>
        </Top>
        <Mid>
          <RecordView>
            <RecordText>0:00</RecordText>
            <RecordTextUnit>시간</RecordTextUnit>
          </RecordView>
          <RecordView>
            <RecordText>--</RecordText>
            <RecordTextUnit>BPM</RecordTextUnit>
          </RecordView>
          <RecordView>
            <RecordText>0:00</RecordText>
            <RecordTextUnit>페이스</RecordTextUnit>
          </RecordView>
        </Mid>
        <Bottom>
          <CircleButton
            onPress={settingHandler}
            size={100}
            buttonColor="#FFBF5F">
            <StopButtonText>정지</StopButtonText>
          </CircleButton>
          <CircleButton
            onPress={settingHandler}
            size={100}
            buttonColor="#FF5F5F">
            <StopButtonText>종료</StopButtonText>
          </CircleButton>
        </Bottom>
      </RunView>
      {isPrepareRun && (
        <CounterView>
          {runCount > 0 ? (
            <CountText>{runCount}</CountText>
          ) : (
            <CountText>출발 !</CountText>
          )}
        </CounterView>
      )}
      <View>
        <TitleView>
          <TitleText>러닝</TitleText>
        </TitleView>
        <KmWrapper>
          <KmBox>
            <KmText>{kmText}</KmText>
            <KmTextUnit>Km</KmTextUnit>
          </KmBox>
        </KmWrapper>
        <RunButtonGroup
          settingHandler={settingHandler}
          startRunHandler={startRunHandler}
          isRun={isRun}
        />
        <NaverMapView
          style={naverMapViewStyle}
          zoomControl={false}
          center={{
            zoom: 15.7,
            // 지도 기울기
            tilt: 0,
            latitude:
              (pathPosition[pathPosition.length - 1].latitude +
                pathPosition[pathPosition.length - 1].latitude) /
              2,
            longitude:
              (pathPosition[pathPosition.length - 1].longitude +
                pathPosition[pathPosition.length - 1].longitude) /
              2,
          }}>
          {/* 시작점 */}
          <Marker
            coordinate={{
              latitude: pathPosition[0].latitude,
              longitude: pathPosition[0].longitude,
            }}
            width={1}
            height={1}
            pinColor="transparent"
            anchor={{x: 0.5, y: 0.5}}
          />
          <Path
            width={10}
            color={'#40C576'}
            outlineWidth={0}
            coordinates={pathPosition}
          />
          <Marker
            coordinate={{
              latitude: markerPosition.latitude,
              longitude: markerPosition.longitude,
            }}
            width={12}
            height={12}
            pinColor={'green'}
            image={require('../../assets/pngIcon/blue-dot.png')}
          />
        </NaverMapView>
      </View>
      <Bottomsheet snapPoint="90%" ref={bottomSheetModalRef}>
        <EditKmItem
          onPress={closeBottomsheet}
          onChange={onChangeKm}
          inputValue={kmText}
        />
      </Bottomsheet>
    </>
  );
};

export default RunScreen;

const View = styled.View`
  flex: 1;
  z-index: 0;
  background-color: #fefefe;
  align-items: center;
  justify-content: center;
`;

const TitleView = styled.View`
  position: absolute;
  z-index: 100;
  width: 100%;
  top: 2%;
`;

const TitleText = styled.Text`
  font-weight: 600;
  font-size: 22px;
  color: #333;
  margin-left: 5%;
`;

const KmWrapper = styled.View`
  z-index: 100;
  width: 100%;
  height: 20%;
  /* top: 16%; */
  top: 5%;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

const KmBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
  border-bottom-width: 2px;
`;

const KmText = styled.Text`
  color: #333;
  font-size: 60px;
  font-weight: bold;
`;

const KmTextUnit = styled.Text`
  color: #333;
  margin-top: auto;
  margin-bottom: 2%;
  margin-left: 10px;
`;

const CounterView = styled.View`
  position: absolute;
  z-index: 1000;
  background-color: #5dadd9;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const CountText = styled.Text`
  font-size: 100px;
  font-weight: bold;
  margin-bottom: 40px;
  color: #fff;
`;

const RunView = styled.View`
  position: absolute;
  z-index: 1000;
  background-color: #5dadd9;
  width: 100%;
  height: 100%;
`;

const Top = styled.View`
  flex: 1;
  border: 1px solid red;
  flex-direction: row;
`;

const KmTextView = styled.View`
  flex: 1;
  background-color: green;
  justify-content: center;
  align-items: center;
`;

const RunKmText = styled.Text`
  font-weight: bold;
  font-size: 50px;
`;
const RunKmTextUnit = styled.Text`
  font-weight: bold;
  font-size: 24px;
`;

const RunMapView = styled.View`
  flex: 1;
  background-color: tomato;
`;

const Mid = styled.View`
  flex: 1;
  border: 1px solid;
  flex-direction: row;
`;

const Bottom = styled.View`
  flex: 1;
  border: 1px solid green;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const RecordView = styled.View`
  flex: 1;
  background-color: green;
  justify-content: center;
  align-items: center;
`;

const RecordText = styled.Text`
  font-weight: bold;
  font-size: 40px;
`;

const RecordTextUnit = styled.Text`
  font-weight: bold;
  font-size: 24px;
`;

const StopButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 24px;
`;
