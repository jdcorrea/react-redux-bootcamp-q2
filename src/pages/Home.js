import React from 'react';
import {Link} from 'react-router-dom';
import {Main} from '../styles/pages/Home.styles';

export const Home = () => {
  return (
    <Main>
      <button
        onClick={() => {
          fetch('/.netlify/functions/hello')
          .then(res => res.json())
          .then(({message}) => console.log('mensaje', {message}))
        }}
      >
        Testing
      </button>
      <h1>Welcome to WizeStore!</h1>
      <p>
        Browse our <Link to='/products'>products</Link>
      </p>
    </Main>
  );
};
