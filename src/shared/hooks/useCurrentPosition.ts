import Geolocation from '@react-native-community/geolocation';
import {IPositionBase} from '@shared/interface/position.interface';

const useCurrentPosition = () => {
  const getCurrentPosition = (): Promise<IPositionBase> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        info => {
          resolve({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          });
        },
        error => {
          console.error(error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
        },
      );
    });
  };

  return getCurrentPosition;
};

export default useCurrentPosition;
