import React from 'react';
import styled from '@emotion/native';
import {Provider} from 'react-redux';
import store from '@shared/redux/store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {theme} from '@shared/styles/theme';
import {ThemeProvider} from '@emotion/react';
import AppInner from '@/AppInner';

const App = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GHRootView>
          <AppInner />
        </GHRootView>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

const GHRootView = styled(GestureHandlerRootView)`
  flex: 1;
`;
