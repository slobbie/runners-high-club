// =============================================================================
// File    : services.ts
// Class   :
// Purpose : services.ts
// Date    : 2024.05
// Author  : JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import Config from 'react-native-config';

const baseUrl = Config.BASE_URL;
const baseHost = Config.HOST_URL;

/** 서비스 상수 */
const services = Object.freeze({
  api: {
    contentType: 'application/json; charset=utf-8',
    version: '/api/v1',
    host: `${baseHost}`,
  },
  url: {
    runningResult: '/runningResult',
    running: '/running',
  },
  webViewUri: {
    login: `${baseUrl}/login`,
  },
  webView: {
    login: 'login',
    logout: 'logout',
  },
  slice: {
    login: 'loginSlice',
    run: 'runSlice',
    navigation: 'navigation',
    common: 'common',
  },
  storage: {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    permission: {
      location: 'location',
      camera: 'camera',
      photo: 'photo',
      bluetooth: 'bluetooth',
    },
  },
});

export default services;
