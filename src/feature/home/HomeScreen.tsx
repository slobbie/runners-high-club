// =============================================================================
// File    :  HomeScreen.tsx
// Class   :
// Purpose :  HomeScreen
// Date    :  2024.05
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import React, {useEffect} from 'react';
import styled from '@emotion/native';
import {AppState, AppStateStatus} from 'react-native';
import useHealthPermissions from '@hooks/useHealthPermissions';
import healthPermissions from '@common/constants/healthPermissions';

/**
 * 기록 화면
 * @returns React.JSX.Element
 */
const HomeScreen = () => {
  const healthPermissionController = useHealthPermissions();

  /** 건강 데이터 권한 요청 이펙트 */
  useEffect(() => {
    healthPermissionController.initHealthPermission(healthPermissions);
  }, [healthPermissionController]);

  /** 백그라운드 에서 다시 앱으로 돌아왔을 시 실행 */
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        console.log(`백그라운드에서 돌아옴 :`, nextAppState);
        healthPermissionController.getPermissionAuthStatus(healthPermissions);
      }
    };
    const listener = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      listener.remove();
    };
  }, [healthPermissionController]);

  return (
    <View>
      <Text>홈</Text>
    </View>
  );
};

export default HomeScreen;

const View = styled.View`
  flex: 1;
  background-color: tomato;
`;

const Text = styled.Text`
  color: #333;
`;
