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

import React, {useEffect, useState} from 'react';
import styled from '@emotion/native';
import NaverMapView, {Marker} from 'react-native-nmap';
import useDevicePermissions, {TPermission} from '@/hooks/useDevicePermissions';
import Geolocation from '@react-native-community/geolocation';
import services from '@common/constants/services';
import {AppState, AppStateStatus} from 'react-native';

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
  const [myPosition, setMyPosition] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });

  /** 위치 권한 여부 */
  const [isPermissionsState, setIsPermissionsState] = useState(false);

  /** 로케이션 권한 검사 이펙트 */
  useEffect(() => {
    (async () => {
      const isPermissions = await permissions.getDevicePermission(
        location,
        '러닝 측정을 위해선 권한 허용이 필요합니다.',
      );
      setIsPermissionsState(isPermissions as boolean);
    })();
  }, [location, permissions]);

  /** 현재 디바이스 위치 이펙트 */
  useEffect(() => {
    if (isPermissionsState) {
      Geolocation.getCurrentPosition(
        info => {
          setMyPosition({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
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

  return (
    <View>
      <NaverMapView
        style={{width: '100%', height: '100%'}}
        zoomControl={false}
        center={{
          zoom: 16,
          // 지도 기울기
          tilt: 0,
          latitude: (myPosition?.latitude + myPosition?.latitude) / 2,
          longitude: (myPosition?.longitude + myPosition?.longitude) / 2,
        }}>
        <Marker
          coordinate={{
            latitude: myPosition.latitude,
            longitude: myPosition.longitude,
          }}
          width={15}
          height={15}
          anchor={{x: 0.5, y: 0.5}}
          caption={{text: '나'}}
          image={require('../../assets/pngIcon/blue-dot.png')}
        />
      </NaverMapView>
    </View>
  );
};

export default RunScreen;

const View = styled.View`
  flex: 1;
  background-color: blue;
`;
