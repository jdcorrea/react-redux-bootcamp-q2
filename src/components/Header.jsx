import React from 'react';
import { useAuth } from '../context/AuthContext.js';

import {
  Bar,
  Links,
  FlexContainer,
} from '../styles/components/Header.styles.js';

export const Header = () => {
  const { currentUser } = useAuth();
  return (
    <Bar className="topnav" id="myTopnav" data-testid="bar">
      <Links to="/">
        Wizestore
      </Links>
      <FlexContainer>
        <Links to="/products">Products</Links>
        <Links to="/cart">Cart</Links>
        <Links to="/login">{currentUser ? 'logout' : 'login'}</Links>
      </FlexContainer>
    </Bar>
  );
};