import services from '@shared/constants/services';
import axiosHelper from '@shared/utils/axiosHelper';

import {IRunRecord} from '@api/run/interface/run.interface';

/**
 * 러닝 기록 api
 * @returns postRunRecord 러닝 결과 기록 api
 * @returns getRunRecord 러닝 기록 호출 api
 */
const runApi = () => {
  const axios = axiosHelper();

  /**
   * 러닝 결과 기록 api
   * @param param
   * @returns
   */
  const postRunRecord = async (param: IRunRecord) => {
    try {
      const res = axios.post(services.url.running, param);
      return res;
    } catch (error) {
      throw new Error('error postRunRecord');
    }
  };

  /**
   * 러닝 기록 호출 api
   */
  const getRunRecord = async () => {
    try {
      const res = axios.post(services.url.runningResult, {
        id: 1,
        name: '일단은 빈값!',
      });
      return res;
    } catch (error) {
      throw new Error('error getRunRecord');
    }
  };

  return {
    postRunRecord,
    getRunRecord,
  };
};

export default runApi;
