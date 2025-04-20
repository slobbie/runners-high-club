import {ANDROID, IOS} from '@shared/constants/platform';
import {Alert} from 'react-native';
import {
  check,
  PERMISSIONS,
  request,
  RESULTS,
  Permission,
  PermissionStatus,
  requestMultiple,
} from 'react-native-permissions';

/** 권한 인터페이스 */
interface IPermissionsPerOS {
  [key: string]: Permission;
  camera: Permission;
  bluetooth: Permission;
  microphone: Permission;
}

/** ios 권한  */
const iosPermissions: IPermissionsPerOS = Object.freeze({
  location: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  camera: PERMISSIONS.IOS.CAMERA,
  bluetooth: PERMISSIONS.IOS.BLUETOOTH,
  microphone: PERMISSIONS.IOS.MICROPHONE,
  speechRecognition: PERMISSIONS.IOS.SPEECH_RECOGNITION,
  photoLibrary: PERMISSIONS.IOS.PHOTO_LIBRARY,
  photoLibraryAddOnly: PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
  appTrackingTransparency: PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
});

/** android 권한 */
const androidPermissions: IPermissionsPerOS = Object.freeze({
  camera: PERMISSIONS.ANDROID.CAMERA,
  location: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  bluetooth: PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
  microphone: PERMISSIONS.ANDROID.RECORD_AUDIO,
  photoLibrary: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
  readExternalStorage: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  writeExternalStorage: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  readMediaVisualUserSelected:
    PERMISSIONS.ANDROID.READ_MEDIA_VISUAL_USER_SELECTED,
  notification: PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
});

export type TPermission =
  | 'camera'
  | 'bluetooth'
  | 'microphone'
  | 'location'
  /** ios 말하기 권한 */
  | 'speechRecognition'
  /** 안드로이드 오디오 사용 */
  | 'readExternalStorage'
  /** 안드로이드 오디오 사용 */
  | 'writeExternalStorage'
  /** 안드로이드 14 버전 미디어 사용 권한 */
  | 'readMediaVisualUserSelected'
  /** 앨범 읽기 권한 */
  | 'photoLibrary'
  /** ios 앨범 쓰기 권한 */
  | 'photoLibraryAddOnly'
  /** 알림 권한 */
  | 'notification'
  /** ios 앱추적 권한 */
  | 'appTrackingTransparency';

interface IPermissionStatus {
  permission: TPermission;
  status: PermissionStatus;
}

/**
 * 디바이스 권한 요청 hook
 * @returns {getPermission, androidVibrationPermission}
 */
const useDevicePermissions = () => {
  /** 다바이스 권한 요청 실패시 실행 함수  */
  const permissionFailed = async (message: string, notUsed?: boolean) => {
    if (notUsed) {
      Alert.alert(message);
    }
  };

  /** os 별 권한 체크 함수 */
  const checkCurrentOs = (reqPermission: TPermission) => {
    let permission: Permission;

    if (IOS) {
      permission = iosPermissions[reqPermission];
      return permission;
    } else if (ANDROID) {
      permission = androidPermissions[reqPermission];
      return permission;
    }
  };

  /**
   * 디바이스 권한 요청 결과 반환 함수
   * @property { TPermission } permission
   * @return Promise<IPermissionStatus>
   */
  const getPermissionStatus = async (
    permission: TPermission,
  ): Promise<IPermissionStatus> => {
    /** 현재 os 에 따른 권한 값 */
    const currentPermission = checkCurrentOs(permission);
    /** 권한 체크 결과 */
    const checkedPermission = await check(currentPermission as Permission);
    console.log(' checkedPermission:', permission, checkedPermission);
    return {
      permission: permission,
      status: checkedPermission,
    };
  };

  /** 재요청 불가능 케이스 처리 */
  const failPermissionCase = async (
    status: PermissionStatus,
    permission: TPermission,
  ): Promise<boolean> => {
    switch (status) {
      //  이 기능은 사용할 수 없습니다 라는 상태
      case 'unavailable': {
        permissionFailed(
          `${permission} 해당 기능은 해당 기기에서 사용할수 없습니다.`,
          true,
        );
        break;
      }
      // 권한이 제한적으로 허용되었습니다 라는 상태
      case 'limited': {
        permissionFailed(
          `${permission} 사용 권한이 제한적 허용 되었습니다. 앱을 사용하기 위해서는 모든 권한 설정이 필수 입니다.`,
        );
        break;
      }
      // 권한이 거부되었으며 더 이상 요청할 수 없습니다 라는 상태
      case 'blocked': {
        permissionFailed(
          `${permission} 사용 권한이 거부 되었습니다. 앱을 사용하기 위해서는 모든 권한 설정이 필수 입니다.`,
        );
        break;
      }
      default:
        break;
    }

    return false;
  };

  /** defined case 처리 */
  const definedPermission = async (permission: TPermission[]) => {
    const permissionLength = permission.length;
    if (permissionLength === 1) {
      const currentPermission = checkCurrentOs(permission[0]);
      const requested = await request(currentPermission as Permission);
      // 권한이 요청되지 않았거나 요청 가능하지만 거부되었습니다 라는 상태
      if (requested === RESULTS.GRANTED || requested === RESULTS.LIMITED) {
        return true;
      } else {
        permissionFailed(
          `${permission} 사용 권한이 거부 되었습니다. 앱을 사용하기 위해서는 권한 설정이 필수 입니다.`,
        );
        return false;
      }
    } else {
      /** 요청 권한 리스 생성 */
      const newCheckItem = permission.map(item => {
        return checkCurrentOs(item);
      });

      if (newCheckItem) {
        const multipleRequested = await requestMultiple(
          newCheckItem as Permission[],
        );

        /** 반환되는 값을 배열로 복사 */
        const finedGranted = Object.entries(multipleRequested).reduce(
          (acc, [_, value]) => {
            acc.push(value === 'granted');
            return acc;
          },
          [] as boolean[],
        );

        /** 권한 허용 여부 */
        const isGranted = finedGranted.every(Boolean);

        if (isGranted) {
          return true;
        } else {
          permissionFailed(
            '앱을 사용하기 위해서는 모든 권한 설정이 필수 입니다.',
          );
          return false;
        }
      }
    }
    return false;
  };

  /**
   *  권한 요청 상태 따른 상황 예외처리  함수
   * @property {IPermissionStatus[]} resultPermissionStatus
   * @returns Promise<Boolean>
   */
  const handlePermissionStatus = async (
    resultPermissionStatus: IPermissionStatus[],
  ): Promise<boolean> => {
    let resultPermission: boolean = false;
    /** defined 배열 생성 */
    const definedItem = resultPermissionStatus
      .map(item => {
        if (item.status === 'denied') {
          return item.permission;
        }
        return '';
      })
      .filter(item => item !== '');
    /** granted defined 를 제외한 상태  배열 생성 */
    const notPermission = resultPermissionStatus.filter(not => {
      return not.status !== 'granted' && not.status !== 'denied';
    });

    /** defined 배열 있다면 */
    if (definedItem.length > 0) {
      resultPermission = await definedPermission(definedItem as TPermission[]);
    } else {
      resultPermission = true;
    }
    /** 권환 요청 실패 케이스가 존재한다면 */
    if (notPermission.length > 0) {
      // /** 권한 요청에 대한 처리와 결과 여부 반환 */
      await Promise.all(
        resultPermissionStatus.map(async per => {
          const {status, permission} = per;
          await failPermissionCase(status, permission);
        }),
      );
    }
    return resultPermission && notPermission.length <= 0;
  };

  /**
   * 디바이스 권한 요청 결과 반환 함수
   * @property { TPermission } permission
   * @return Promise<IPermissionStatus>
   */
  const getPermissionsStatus = async (
    permissions: TPermission[],
  ): Promise<boolean> => {
    const resultPermissionStatus = await Promise.all(
      permissions.map(permission => {
        return getPermissionStatus(permission);
      }),
    );

    const reqPermission = resultPermissionStatus.filter(item => {
      return item.status !== 'granted';
    });

    return reqPermission.length <= 0;
  };

  /**
   * 권한 요청 함수
   * @property { TPermission[] } 요청권한 배열
   * @returns Promise<Boolean>
   */
  const getPermission = async (
    permissions: TPermission[],
  ): Promise<boolean> => {
    /** 권한 요청에 대한 결과리스트 생성 */
    const resultPermissionStatus = await Promise.all(
      permissions.map(permission => {
        return getPermissionStatus(permission);
      }),
    );

    const reqPermission = resultPermissionStatus.filter(item => {
      return item.status !== 'granted';
    });

    if (reqPermission.length > 0) {
      /** 권한 요청에 대한 성공 여부 */
      const isPermission = handlePermissionStatus(resultPermissionStatus);
      return isPermission;
    } else {
      return true;
    }
  };

  return {
    getPermission,
    getPermissionStatus,
    getPermissionsStatus,
  };
};

export default useDevicePermissions;
