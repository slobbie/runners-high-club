import {PayloadAction} from '@reduxjs/toolkit';
import services from '@shared/constants/services';
import {createSlice} from '@reduxjs/toolkit';

interface runInitState {
  distanceRun: string;
  distanceRunningTime: string;
  distanceRunningPace: string;
}

const initLRunState: runInitState = {
  distanceRun: '0.00',
  distanceRunningTime: '0:00',
  distanceRunningPace: '0:00',
};

/**
 * 런 스크린 슬라이스
 */
const runSlice = createSlice({
  name: services.slice.run,
  initialState: initLRunState,
  reducers: {
    /** 달린거리 저장 함수 */
    setDistanceRun(state, action: PayloadAction<string>) {
      state.distanceRun = action.payload;
    },
    /** 달린거리 저장 함수 */
    setDistanceRunningTime(state, action: PayloadAction<string>) {
      state.distanceRunningTime = action.payload;
    },
    /** 달린거리 페이스 저장 함수 */
    setDistanceRunningPace(state, action: PayloadAction<string>) {
      state.distanceRunningPace = action.payload;
    },
  },
});

export const {setDistanceRun} = runSlice.actions;
export type {};
export default runSlice;
