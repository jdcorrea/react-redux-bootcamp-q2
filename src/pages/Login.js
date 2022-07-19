import React, { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import { useAuth } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import { cleanProductsList } from '../state/reducers/apiStoreReducer';

import {Container} from '../styles/pages/Login.styles.js';

export const Login = () => {
  const { authMode, logout } = useAuth();
  const dispatch = useDispatch()

  useEffect(() => {
    logout();
    dispatch(cleanProductsList());
  }, [logout, dispatch])
  
  const renderLogin = (mode) => {
    if (mode === 'login') {
      return <Container><LoginForm/></Container>
    }
    if (mode === 'signup'){
      return <Container><SignupForm/></Container>
    }
    return <Container>Form not found!</Container>
  }

  return (
    renderLogin(authMode)
  )
}
