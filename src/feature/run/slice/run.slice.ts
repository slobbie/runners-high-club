// =============================================================================
// File    : run.slice.ts
// Class   :
// Purpose : run.slice.ts
// Date    : 2024.06
// Author  : JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import services from '@common/constants/services';
import {createSlice} from '@reduxjs/toolkit';

interface runInitState {}

const initLRunState: runInitState = {};

/**
 * 런 스크린 슬라이스
 */
const runSlice = createSlice({
  name: services.slice.run,
  initialState: initLRunState,
  reducers: {},
});

export const {} = runSlice.actions;
export type {};
export default runSlice;
