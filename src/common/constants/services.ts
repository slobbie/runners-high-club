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

/** 서비스 상수 */
const services = Object.freeze({
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
