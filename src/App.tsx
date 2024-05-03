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

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar barStyle="default" />
      <StackNavigation />
    </SafeAreaView>
  );
}

export default App;

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;
