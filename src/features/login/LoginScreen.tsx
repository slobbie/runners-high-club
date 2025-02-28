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

import React from 'react';
import {screenPath} from '@shared/constants/screenPath';
import styled from '@emotion/native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import services from '@shared/constants/services';
import EncryptedStorage from 'react-native-encrypted-storage';
import loginSlice, {IMemberData} from '@features/login/slice/login.slice';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@shared/navigation/StackNavigation';

/** 로그인 데이터 인터페이스  */
interface loginData extends IMemberData {
  refreshToken: string;
}

/** 로그인  onMessage 인터페이스 */
interface ILoginMessageData {
  type: 'login';
  data: loginData;
}

export type LoginScreenProps = StackScreenProps<RootStackParamList, 'login'>;

/**
 * 로그인 스크린 컴포넌트
 * @returns React.JSX.Element
 */
const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigationName = screenPath.navigation;
  const navigation = useNavigation<LoginScreenProps['navigation']>();

  /** 로그인 메세지 수신 함수 */
  const onLoginMessage = async (e: WebViewMessageEvent) => {
    navigation.replace(navigationName.tab as keyof RootStackParamList);
    const loginData = JSON.parse(e.nativeEvent.data) as ILoginMessageData; // 로그인 하기
    if (loginData.type === services.webView.login) {
      /** 리프레시 토큰 저장 */
      await EncryptedStorage.setItem(
        services.storage.refreshToken,
        loginData.data.refreshToken as string,
      );
      /** 회원 정보 저장 */
      dispatch(
        loginSlice.actions.setMemberData({
          accessToken: loginData.data.accessToken,
          id: loginData.data.id,
          memberEmail: loginData.data.memberEmail,
          name: loginData.data.name,
        }),
      );
      navigation.replace(navigationName.drawer as keyof RootStackParamList);
    }
  };

  return (
    <View>
      <WebView
        hideKeyboardAccessoryView={true}
        setBuiltInZoomControls={false}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{uri: services.webViewUri.login}}
        onMessage={onLoginMessage}
      />
    </View>
  );
};

export default LoginScreen;

const View = styled.View`
  width: 100%;
  height: 100%;
`;
