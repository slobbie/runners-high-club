import services from '@shared/constants/services';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

/** 회원 정보 데이터  */
interface IMemberData {
  accessToken: string;
  id: number;
  memberEmail: string;
  name: string;
}

interface LoginState {
  memberData?: IMemberData;
}

const initLoginState: LoginState = {
  memberData: {
    accessToken: '',
    id: -1,
    memberEmail: '',
    name: '',
  },
};

/**
 * 로그인 슬라이스
 */
const loginSlice = createSlice({
  name: services.slice.login,
  initialState: initLoginState,
  reducers: {
    /** 회원 정보 저장 함수 */
    setMemberData(state, action: PayloadAction<IMemberData>) {
      state.memberData = action.payload;
    },
  },
});

export const {} = loginSlice.actions;
export type {IMemberData};
export default loginSlice;
