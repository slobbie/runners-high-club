import React from 'react';
import {StatusBar} from 'react-native';
import styled from '@emotion/native';
import StackNavigation from '@shared/navigation/StackNavigation';
import {Provider, useSelector} from 'react-redux';
import store, {RootState} from '@shared/redux/store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {theme} from '@shared/styles/theme';
import {ThemeProvider} from '@emotion/react';

/**
 *
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const AppInner = () => {
  const safeAreaViewBg = useSelector(
    (state: RootState) => state.common.safeAreaViewBg,
  );
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GHRootView>
          <SafeAreaView $bgColor={safeAreaViewBg}>
            <StatusBar barStyle="default" />
            <StackNavigation />
          </SafeAreaView>
        </GHRootView>
      </ThemeProvider>
    </Provider>
  );
};

export default AppInner;

const SafeAreaView = styled.SafeAreaView<{$bgColor: string}>`
  flex: 1;
  background-color: ${props => props.$bgColor};
`;

const GHRootView = styled(GestureHandlerRootView)`
  flex: 1;
`;
