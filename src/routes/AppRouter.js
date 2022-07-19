import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {Products} from '../pages/Products';
import {Cart} from '../pages/Cart';
import {Home} from '../pages/Home';
import {Header} from '../components/Header';
import { Login } from '../pages/Login';
import { AuthProvider, useAuth } from '../context/AuthContext';

export const AppRouter = () => {
  const { currentUser } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/products'>
            { currentUser ? <Products /> : <Redirect to="/login"/> }
          </Route>
          <Route path='/cart'>
            { currentUser ? <Cart /> : <Redirect to="/login"/> }
          </Route>
          <Route path='/login'>
              <Login />
          </Route>
          <Route path='/signup'>
              <Login />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};
