/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import styled from '@emotion/native';
import StackNavigation from '@navigation/StackNavigation';
import {Provider} from 'react-redux';
import store from '@redux/store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <GHRootView>
        <SafeAreaView>
          <StatusBar barStyle="default" />
          <StackNavigation />
        </SafeAreaView>
      </GHRootView>
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
