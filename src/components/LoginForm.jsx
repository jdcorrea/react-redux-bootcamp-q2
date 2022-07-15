import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import { addUser } from '../state/reducers/wizelineReducer'

import { Form, Title, Label, Input, Button, ButtonContainer } 
  from '../styles/components/Login.styles.js';

const LoginForm = () => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, toggleAuthStatus } = useAuth();
  const [customErrorToShow, setCustomErrorToShow] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const submitLogin = async (e) => {
    e.preventDefault();
    setCustomErrorToShow('');
    
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      setLoading(true);
      setCustomErrorToShow('');
      await login(email, password);
      dispatch(addUser({id: email}))
      history.push('/');
    } catch (error) {
      setCustomErrorToShow('email or password wrong', error);
    }
    setLoading(false);
  }

  const switchToLoginForm = () => {
    toggleAuthStatus('signup');
    history.push('/signup');
  }

  return (
    <Form>
      <Title>Welcome to the WizeStore!</Title>
      <Label htmlFor="email">Email</Label>
      <Input type="text" name="email" ref={emailRef} placeholder='Enter Email'/>
      <Label htmlFor="password">Password</Label>
      <Input type="password" name="password" ref={passwordRef} placeholder='Enter Password'/>
      <Button type="button" disabled={loading} onClick={submitLogin}>Login</Button>
      <ButtonContainer>
        <label>Doesn't have an account?</label>
        <Button type="button" onClick={switchToLoginForm} $type="secondary">Signup</Button>
      </ButtonContainer>
      <Label $type='error'>{customErrorToShow}</Label>
    </Form>
  )
}

export default LoginForm;