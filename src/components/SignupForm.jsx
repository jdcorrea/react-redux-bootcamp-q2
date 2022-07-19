import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import { addUser } from '../state/reducers/wizelineReducer'
import { getProducts } from '../state/reducers/apiStoreReducer';

import { Form, Title, Label, Input, Button, ButtonContainer } 
  from '../styles/components/Login.styles.js';

const SignupForm = () => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { signup, toggleAuthStatus } = useAuth();
  const [customErrorToShow, setCustomErrorToShow] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const submitSignup = async (e) => {
    e.preventDefault();
    setCustomErrorToShow('');
    
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirmation = passwordConfirmationRef.current.value;

    if (password !== passwordConfirmation) {
      return setCustomErrorToShow(`passwords doesn't match`);
    } 

    try {
      setLoading(true);
      setCustomErrorToShow('');
      await signup(email, password);
      toggleAuthStatus('login');
      dispatch(addUser({id: email}));
      dispatch(getProducts());
      history.push('/');
    } catch (error) {
      setCustomErrorToShow('Error signing up');
    }
    setLoading(false)
  }

  const switchToLoginForm = () => {
    toggleAuthStatus('login');
    history.push('/login');
  }

  return (
    <Form>
      <Title>Welcome to the WizeStore!</Title>
      <Label htmlFor="email">Email</Label>
      <Input type="text" name="email" ref={emailRef} placeholder='Enter Email'/>
      <Label htmlFor="password">Password</Label>
      <Input type="password" name="password" ref={passwordRef} placeholder='Enter Password'/>
      <Input type="password" name="password" ref={passwordConfirmationRef} placeholder='Enter Password Confirmation'/>
      <Button type="button" onClick={submitSignup}>Signup</Button>
      <ButtonContainer>
        <label>Already have an account?</label>
        <Button type="button" disabled={loading} onClick={switchToLoginForm} $type="secondary">Login</Button>
      </ButtonContainer>
      <Label>{customErrorToShow}</Label>
    </Form>
  )
}

export default SignupForm;