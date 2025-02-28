import services from '@shared/constants/services';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface navigationInitState {
  isTabShowStatus: boolean;
}

const initNavigationState: navigationInitState = {
  isTabShowStatus: true,
};

/**
 * 네비게이션 슬라이스
 */
const navigationSlice = createSlice({
  name: services.slice.navigation,
  initialState: initNavigationState,
  reducers: {
    /** 탭 네비게이션 표시 상태 */
    setIsTabShowStatus(state, action: PayloadAction<boolean>) {
      state.isTabShowStatus = action.payload;
    },
  },
});

export const {} = navigationSlice.actions;
export type {};
export default navigationSlice;
