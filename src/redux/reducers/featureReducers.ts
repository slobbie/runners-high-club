import loginSlice from '@feature/login/slice/login.slice';
import {combineReducers} from '@reduxjs/toolkit';

/**
 * 각 업무에서 사용하는 Reducer 병합 처리
 */
const featureReducers = combineReducers({
  login: loginSlice.reducer,
});

export default featureReducers;
