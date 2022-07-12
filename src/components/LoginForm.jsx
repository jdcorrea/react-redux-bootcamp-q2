import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoginApi from '../utils/loginApi';
import { useSelector, useDispatch } from "react-redux";
import { setActiveUser } from '../state/reducers/wizelineReducer';

import { Form, Title, Label, Input, Button } 
  from '../styles/components/Login.styles.js';

const LoginForm = () => {
  const { activeUser } = useSelector(state => state.storeData);
  const dispatch = useDispatch();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const [customErrorToShow, setCustomErrorToShow] = useState('');
  const history = useHistory();
  const [isUserActive, setIsUserActive] = useState(activeUser);

  useEffect(() => {
    if (isUserActive !== null) {
      dispatch(setActiveUser({id: null}));
      setIsUserActive(null);
    }
  }, [isUserActive, dispatch])
  
  const handleOnClick = () => {
    const username = userNameRef.current.value;
    const password = passwordRef.current.value;
    setCustomErrorToShow('')
  
    try {
      LoginApi(username, password)
        .then(data => {
          dispatch(setActiveUser({id: data.id}));
          history.push('/');
        })
        .catch(err => setCustomErrorToShow(err.message))
    } catch (error) {
      setCustomErrorToShow('Error connecting with the server');
    }
  }

  return (
    <Form>
      <Title>Welcome to the WizeStore!</Title>
      <Label htmlFor="username">Username</Label>
      <Input type="text" name="username" ref={userNameRef} placeholder='Enter Username'/>
      <Label htmlFor="password">Password</Label>
      <Input type="password" name="password" ref={passwordRef} placeholder='Enter Password'/>
      <Button type="button" onClick={handleOnClick}>Login</Button>
      <Label>{customErrorToShow}</Label>
    </Form>
  )
}

export default LoginForm;