// =============================================================================
// File    :  HomeScreen.tsx
// Class   :
// Purpose :  HomeScreen
// Date    :  2024.05
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import React from 'react';
import styled from '@emotion/native';

/**
 *
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const HomeScreen = () => {
  return (
    <View>
      <Text>홈</Text>
    </View>
  );
};

export default HomeScreen;

const View = styled.View`
  flex: 1;
  background-color: tomato;
`;

const Text = styled.Text`
  color: #333;
`;
