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

import React, {useEffect, useMemo, useState} from 'react';
import styled from '@emotion/native';
import NaverMapView, {Marker, Path} from 'react-native-nmap';
import useDevicePermissions, {TPermission} from '@hooks/useDevicePermissions';
import Geolocation from '@react-native-community/geolocation';
import services from '@common/constants/services';
import {AppState, AppStateStatus, StyleProp, ViewStyle} from 'react-native';
import CircleButton from '@common/components/button/CircleButton';
import SvgIcon from '@common/components/icon/SvgIcon';

/**
 * 달리기 측정 화면
 * @returns React.JSX.Element
 */
const RunScreen = () => {
  /** 디바이스 권한 훅스 */
  const permissions = useDevicePermissions();
  /** 로케이션 권한 상수  */
  const location = services.storage.permission.location as TPermission;

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

  /** 현재 디바이스 위치 이펙트 */
  useEffect(() => {
    if (isPermissionsState) {
      Geolocation.getCurrentPosition(
        info => {
          // setMyPosition({
          //   latitude: info.coords.latitude,
          //   longitude: info.coords.longitude,
          // });
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

  /** 앱 백그라운드 상태 감지 */
  const [appState, setAppState] = useState(AppState.currentState);

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

  const [isRun, setIsRun] = useState(false);

  const startRunHandler = () => {
    setIsRun(prev => !prev);
  };

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

  /** 네이버 맵뷰 스타일 */
  const naverMapViewStyle = useMemo(() => {
    return {
      width: '100%',
      height: '50%',
    } as StyleProp<ViewStyle>;
  }, []);

  /** 셋팅 바텀시트 호출 핸들러 */
  const settingHandler = () => {};

  return (
    <View>
      <TitleView>
        <TitleText>러닝</TitleText>
      </TitleView>
      <KmWrapper>
        <KmBox>
          <KmText>3.00</KmText>
          <KmTextUnit>Km</KmTextUnit>
        </KmBox>
      </KmWrapper>
      <ButtonWrapper>
        <ButtonBox>
          <CircleButton onPress={settingHandler} size={40} buttonColor="#fff">
            <SvgIcon name="setting" size={24} />
          </CircleButton>
          <CircleButton onPress={startRunHandler} size={80}>
            <ButtonText>Run</ButtonText>
          </CircleButton>
          <CircleButton onPress={startRunHandler} size={40} buttonColor="#fff">
            <SvgIcon name="setting" size={24} />
          </CircleButton>
        </ButtonBox>
      </ButtonWrapper>
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
          caption={{text: '시작점'}}
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
          // anchor={{x: 0.5, y: 0.5}}
          pinColor={'green'}
          image={require('../../assets/pngIcon/blue-dot.png')}
        />
      </NaverMapView>
    </View>
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
