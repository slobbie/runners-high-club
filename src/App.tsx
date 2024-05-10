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

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <StatusBar barStyle="default" />
        <StackNavigation />
      </SafeAreaView>
    </Provider>
  );
}

export default App;

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;
