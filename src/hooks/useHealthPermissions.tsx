// =============================================================================
// File    :  useHealthPermissions.tsx
// Class   :
// Purpose :  useHealthPermissions
// Date    :  2024.05
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import {useCallback} from 'react';
import {Alert, Linking} from 'react-native';
import AppleHealthKit, {HealthKitPermissions} from 'react-native-health';

/**
 *  건강 관련 권한 요청 hook
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const useHealthPermissions = () => {
  /** 건강 데이터 권한 설정 요청 */
  const initHealthPermission = useCallback(
    (permissions: HealthKitPermissions) => {
      AppleHealthKit.initHealthKit(permissions, (error: string) => {
        if (error) {
          return;
        }
      });
    },
    [],
  );

  /** 건강 데이터 권한 상태 확인 */
  const getPermissionAuthStatus = useCallback(
    (permissions: HealthKitPermissions) => {
      AppleHealthKit.getAuthStatus(permissions, (err, results) => {
        if (err) {
          console.log('error getting HealthKit auth status: ', err);
          return;
        }
        /** 읽기 권한 여부  */
        const readCheck = results.permissions.read.every(
          item => item === 0 || item === 1,
        );
        /** 쓰기 권한 여부  */
        const writeCheck = results.permissions.write.every(
          item => item === 0 || item === 1,
        );
        if (readCheck && writeCheck) {
          Alert.alert(
            '건강 데이터 권한 허용이 필요한 서비스 입니다.',
            '데이터 접근 및 기기 -> 러너스하이 -> 모두켜기',
            [
              {
                text: '설정으로 이동',
                onPress: () => {
                  Linking.openURL('App-Prefs:HEALTH');
                },
              },
            ],
          );
        }
      });
    },
    [],
  );
  return {
    initHealthPermission,
    getPermissionAuthStatus,
  };
};

export default useHealthPermissions;
