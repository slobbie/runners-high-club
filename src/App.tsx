import React from 'react';
import styled from '@emotion/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import {theme} from '@shared/styles/theme';
import {ThemeProvider} from '@emotion/react';
import StackNavigation from '@shared/navigation/StackNavigation';

const App = (): React.JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <GHRootView>
        <BottomSheetModalProvider>
          <StackNavigation />
        </BottomSheetModalProvider>
      </GHRootView>
    </ThemeProvider>
  );
};

export default App;

const GHRootView = styled(GestureHandlerRootView)`
  flex: 1;
`;
