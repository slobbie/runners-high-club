import {combineReducers} from '@reduxjs/toolkit';
import loginSlice from '@feature/login/slice/login.slice';
import runSlice from '@feature/run/slice/run.slice';
import navigationSlice from '@navigation/slice/navigation.slice';
import commonSlice from '@common/slice/common.slice';

/**
 * 각 업무에서 사용하는 Reducer 병합 처리
 */
const featureReducers = combineReducers({
  login: loginSlice.reducer,
  run: runSlice.reducer,
  navigation: navigationSlice.reducer,
  common: commonSlice.reducer,
});

export default featureReducers;
