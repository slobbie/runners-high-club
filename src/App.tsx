import React from 'react';
import {StatusBar} from 'react-native';
import styled from '@emotion/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {theme} from '@shared/styles/theme';
import {ThemeProvider} from '@emotion/react';
import useBackBgStore from '@shared/store/backBgStore';
import StackNavigation from '@shared/navigation/StackNavigation';

const App = (): React.JSX.Element => {
  const safeAreaViewBg = useBackBgStore(state => state.safeAreaViewBg);

  return (
    <ThemeProvider theme={theme}>
      <GHRootView>
        <SafeArea $bgColor={safeAreaViewBg}>
          <StatusBar barStyle="default" />
          <StackNavigation />
        </SafeArea>
      </GHRootView>
    </ThemeProvider>
  );
};

export default App;

const SafeArea = styled.SafeAreaView<{$bgColor: string}>`
  flex: 1;
  background-color: ${props => props.$bgColor};
`;

const GHRootView = styled(GestureHandlerRootView)`
  flex: 1;
`;
