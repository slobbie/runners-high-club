import React from 'react';
import styled from '@emotion/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import {theme} from '@shared/styles/theme';
import {ThemeProvider} from '@emotion/react';
import StackNavigation from '@shared/navigation/StackNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = (): React.JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <GHRootView>
          <BottomSheetModalProvider>
            <StackNavigation />
          </BottomSheetModalProvider>
        </GHRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;

const GHRootView = styled(GestureHandlerRootView)`
  flex: 1;
`;
