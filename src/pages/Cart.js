import React, { useLayoutEffect, useRef, useState, useEffect} from 'react'
import { useSelector } from "react-redux";
import CartList from '../components/CartList'
import CartSummary from '../components/CartSummary'

import { getViewSize } from '../styles/globalStyles.js'
import { CartContainer, CartDetails, Title, EmptyCart } 
  from '../styles/pages/Cart.styles.js';

export const Cart = () => {
  const titleRef = useRef();
  const [offsetTop, setOffsetTop] = useState(getOffsetTop(titleRef) || 0);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  
  useLayoutEffect(() => {
    setOffsetTop(getOffsetTop(titleRef) || 0)
  }, [])

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);
    setOffsetTop(getOffsetTop(titleRef));

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowSize]);  
  
  const DisplayCart = () => {
    const { activeUser } = useSelector(state => state.storeData);
    const cartList = useSelector(state => {
      if (!activeUser) return [];
      const userCart = state.storeData.users.find(user => user.id === activeUser);
      const cartList = userCart?.cartItems;
      return cartList;
    });

    return (
      <CartContainer>
        {
          cartList.length > 0 
            ? 
              <>
                <Title ref={titleRef} $top={offsetTop}>Shopping cart</Title>
                <CartDetails>
                  <CartSummary/>
                  <CartList />
                </CartDetails>  
              </>
            : 
            <EmptyCart>
              There's no items in your cart :(
            </EmptyCart>
        }
      </CartContainer>
    )
  }

  return (
    <DisplayCart/>
  )
}

function getOffsetTop(ref) {
  return ref?.current?.parentElement?.offsetTop || 0;
}

function getWindowSize() {
  const {innerWidth} = window;

  return getViewSize(innerWidth);
}