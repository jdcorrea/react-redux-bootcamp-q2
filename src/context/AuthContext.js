import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // authMode = {login, signup}
  const [authMode, setAuthMode] = useState('login')

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut();
  }

  function toggleAuthStatus(mode) {
    setAuthMode(mode);
  }

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      console.log('newUser', user?.email)
      setLoading(false);
    });
  }, [])
  
  const value = {
    currentUser,
    authMode,
    signup,
    login,
    logout,
    toggleAuthStatus
  }

  return (
    <AuthContext.Provider value={value}>
      { !loading && children }
    </AuthContext.Provider>
  )
}