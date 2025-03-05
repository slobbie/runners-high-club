import {Alert, Linking} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  check,
  PERMISSIONS,
  request,
  RESULTS,
  Permission,
} from 'react-native-permissions';

/** 권한 인터페이스 */
interface IPermissionsPerOS {
  [key: string]: Permission;
  location: Permission;
  camera: Permission;
  photo: Permission;
  bluetooth: Permission;
}

/** ios 권한  */
const iosPermissions: IPermissionsPerOS = Object.freeze({
  location: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  camera: PERMISSIONS.IOS.CAMERA,
  photo: PERMISSIONS.IOS.PHOTO_LIBRARY,
  bluetooth: PERMISSIONS.IOS.BLUETOOTH,
});

export type TPermission = 'location' | 'camera' | 'photo' | 'bluetooth';

/**
 * 디바이스 권한 요청 hook
 * @returns getDevicePermission
 */
const useDevicePermissions = () => {
  /** 다바이스 권한 성공시 실행 함수  */
  const permissionSuccess = async (permission: TPermission) => {
    await EncryptedStorage.setItem(permission, JSON.stringify(true));
  };

  /** 다바이스 권한 실패시 실행 함수  */
  const permissionFailed = async (
    permission: TPermission,
    message: string,
    isEssential: boolean,
  ) => {
    await EncryptedStorage.setItem(permission, JSON.stringify(false));
    if (isEssential) {
      Alert.alert(message);
    } else {
      Alert.alert(message, '앱 설정 화면을 이동하여 허용으로 바꿔주세요.', [
        {
          text: '네',
          onPress: () => Linking.openSettings(),
        },
      ]);
    }
  };

  /**
   * 디바이스 권한 요청 함수
   * @property { TPermission } permission
   * @property { string } failedMessage
   */
  const getDevicePermission = async (
    permission: TPermission,
    failedMessage: string,
  ) => {
    const currentPermission = iosPermissions[permission];

    const checked = await check(currentPermission);
    switch (checked) {
      // 권한 상태가 수락 상태
      case RESULTS.GRANTED:
        permissionSuccess(permission);
        return true;
      // 	이 기능은 사용할 수 없습니다 라는 상태
      case RESULTS.UNAVAILABLE:
        permissionFailed(
          permission,
          '해당 기능은 사용 기기에서 사용할수 없습니다.',
          true,
        );
        return false;
      // 권한이 요청되지 않았거나 요청 가능하지만 거부되었습니다 라는 상태
      case RESULTS.DENIED:
        const requested = await request(currentPermission);
        if (requested === RESULTS.GRANTED) {
          permissionSuccess(permission);
          return true;
        } else {
          return permissionFailed(permission, failedMessage, false);
        }
      // 권한이 제한적으로 허용되었습니다 라는 상태
      case RESULTS.LIMITED:
        permissionFailed(permission, failedMessage, false);
        return false;
      // 권한이 거부되었으며 더 이상 요청할 수 없습니다 라는 상태
      case RESULTS.BLOCKED:
        permissionFailed(permission, failedMessage, false);
        return false;
      default:
        permissionFailed(permission, failedMessage, false);
        return false;
    }
  };

  return {
    getDevicePermission,
  };
};

export default useDevicePermissions;
