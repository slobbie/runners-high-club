export const runUtils = {
  /**
   * 현재 속도(시간당 이동 거리)를 기반으로 앞으로 1km를 달리는데 걸리는 시간을 계산하는 함수
   * @param distanceTraveledRatio - 현재까지 이동한 거리 (0에서 1 사이의 비율)
   * @param timeElapsedInSeconds - 현재까지 경과한 시간 (초 단위)
   * @returns 앞으로 1km를 달리는데 걸리는 시간 (분 단위)
   */
  calculateTimeToRun1kmPace: (
    distanceTraveledRatio: number,
    timeElapsedInSeconds: number,
  ): string => {
    const timeElapsedInMinutes = timeElapsedInSeconds / 60; // 시간을 분 단위로 변환

    // 현재까지의 평균 페이스 계산 (분/km)
    const averagePaceInMinutes = timeElapsedInMinutes / distanceTraveledRatio;

    // 분과 초로 분리
    const minutes = Math.floor(averagePaceInMinutes);
    const seconds = Math.round((averagePaceInMinutes - minutes) * 60);

    // 두 자리 숫자로 포맷팅
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`; // mm:ss 형식으로 반환
  },

  // 두 지점 간의 거리를 계산하는 함수
  calculateDistance: (
    initialLatitude: number,
    initialLongitude: number,
    updatedLatitude: number,
    updatedLongitude: number,
  ): number => {
    // 각도를 라디안으로 변환하는 함수
    const degreesToRadians = (degrees: number): number => {
      return (degrees * Math.PI) / 180;
    };

    const EARTH_RADIUS_KM = 6371; // 지구의 반경 (킬로미터)

    // 두 위도 간의 차이를 라디안으로 변환
    const deltaLatitude = degreesToRadians(updatedLatitude - initialLatitude);
    // 두 경도 간의 차이를 라디안으로 변환
    const deltaLongitude = degreesToRadians(
      updatedLongitude - initialLongitude,
    );

    // 하버사인 공식의 a 값 계산
    const a =
      Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
      Math.cos(degreesToRadians(initialLatitude)) *
        Math.cos(degreesToRadians(updatedLatitude)) *
        Math.sin(deltaLongitude / 2) *
        Math.sin(deltaLongitude / 2);

    // 하버사인 공식의 c 값 계산
    const centralAngle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // 두 지점 간의 거리 계산
    const distance = EARTH_RADIUS_KM * centralAngle;

    return distance; // 킬로미터 단위의 거리 반환
  },
  /** 거리를 형식화하는 함수 */
  formatDistance: (distanceInKm: number): string => {
    return `${distanceInKm.toFixed(2)}`;
  },
};
