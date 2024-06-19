import React from 'react';
import {StatusBar} from 'react-native';
import styled from '@emotion/native';
import StackNavigation from '@navigation/StackNavigation';
import {Provider} from 'react-redux';
import store from '@redux/store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {theme} from '@common/styles/theme';
import {ThemeProvider} from '@emotion/react';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GHRootView>
          <SafeAreaView>
            <StatusBar barStyle="default" />
            <StackNavigation />
          </SafeAreaView>
        </GHRootView>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const GHRootView = styled(GestureHandlerRootView)`
  flex: 1;
`;
