import React, { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import { useAuth } from '../context/AuthContext';

import {Container} from '../styles/pages/Login.styles.js';

export const Login = () => {
  const { authMode, logout } = useAuth();

  useEffect(() => {
    logout()
  }, [logout])
  
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
