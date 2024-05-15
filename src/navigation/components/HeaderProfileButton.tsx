// =============================================================================
// File    :  ProfileButton.tsx
// Class   :
// Purpose :  ProfileButton
// Date    :  2024.05
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import React from 'react';
import styled from '@emotion/native';
import SvgIcon from '@common/components/icon/SvgIcon';

/**
 *  Header profile 버튼
 * @returns React.JSX.Element
 */
const HeaderProfileButton = () => {
  return (
    <Button>
      <SvgIcon name="profile" size={20} fill={'#333'} stroke={'#333'} />
    </Button>
  );
};

export default HeaderProfileButton;

const Button = styled.Pressable`
  width: 50px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
