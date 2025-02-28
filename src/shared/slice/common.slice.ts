import services from '@shared/constants/services';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface commonInitState {
  safeAreaViewBg: string;
}

const initCommonState: commonInitState = {
  safeAreaViewBg: '#fff',
};

/**
 * 런 스크린 슬라이스
 */
const commonSlice = createSlice({
  name: services.slice.common,
  initialState: initCommonState,
  reducers: {
    setSafeAreaViewBg(state, action: PayloadAction<string>) {
      state.safeAreaViewBg = action.payload;
    },
  },
});

export const {} = commonSlice.actions;
export type {};
export default commonSlice;
