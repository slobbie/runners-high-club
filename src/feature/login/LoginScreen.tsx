// =============================================================================
// File    :  LoginScreen.tsx
// Class   :
// Purpose :  LoginScreen
// Date    :  2024.05
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import {screenPath} from '@/common/constants/screenPath';
import styled from '@emotion/native';
import React from 'react';
import WebView from 'react-native-webview';

/**
 * 로그인 스크린 컴포넌트
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const LoginScreen = () => {
  const loginPath = screenPath.webView.login;
  return (
    <View>
      <WebView
        hideKeyboardAccessoryView={true}
        setBuiltInZoomControls={false}
        originWhitelist={['*']}
        source={{uri: loginPath}}
      />
    </View>
  );
};

export default LoginScreen;

const View = styled.View`
  width: 100%;
  height: 100%;
`;
