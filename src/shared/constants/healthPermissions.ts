import AppleHealthKit, {HealthKitPermissions} from 'react-native-health';

/** 건강 데이터 권한 요청 오브젝트 */
const healthPermissions = Object.freeze({
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.BodyTemperature,
    ],
    write: [
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.BodyTemperature,
    ],
  },
}) as HealthKitPermissions;

export default healthPermissions;
