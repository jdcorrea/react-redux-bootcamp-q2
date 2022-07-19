import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { getViewSize } from '../styles/globalStyles.js';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import useProducts from './customHooks/useProducts';
import { getProducts, sendOrder, selectOrderStatus, cleanOrder } from '../state/reducers/apiStoreReducer';
import { cleanUpUserCart } from '../state/reducers/wizelineReducer';
import { useDispatch } from 'react-redux/es/exports';
import { Summary, Paragraph, Button, Title } 
  from '../styles/components/CartSummary.styles.js';

const CartSummary = () => {
  const dispatch = useDispatch();
  const order = useSelector(selectOrderStatus);
  const [orderSent, setOrderSent] = useState(false);
  const { products } = useProducts();
  const [productsItems, setProductsItems] = useState(products);
  const { currentUser } = useAuth();
  const history = useHistory();
  const cartItems = useSelector(state => {
    if (!currentUser) return [];
    const userCart = state.localStore.users.find(user => user.id === currentUser);
    const cartList = userCart?.cartItems?.map(cartItem => {
      const details =  productsItems?.find(item => item.id === cartItem.id)
      return {
        price: details.price,
        quantity: cartItem.quantity
      }
    })
    return cartList || [];
  });
  
  const mainRef = useRef();
  const [offsetTop, setOffsetTop] = useState(0);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const {totalItems, totalCost} = getTotals(cartItems);

  useEffect(() => {
    if (productsItems == null) {
      dispatch(getProducts());
      setProductsItems(products);
    }
  }, [productsItems, dispatch, products])

  useEffect(() => {
    if (order.id != null) {
      alert(`Order: ${order.id} - Details: ${order.message}`);
      dispatch(cleanOrder());
      dispatch(cleanUpUserCart({id: currentUser}))
      history.push('/cart');
    }
  }, [orderSent, order, currentUser, dispatch, history])

  useLayoutEffect(() => {
    setOffsetTop(getOffsetTop(mainRef));
  }, [])
  
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);
    setOffsetTop(getOffsetTop(mainRef));

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowSize]);

  return (
    <Summary ref={mainRef} $top={offsetTop}>
      <Title>Summary</Title>
      <Paragraph>Items: <span>{totalItems || 0}</span></Paragraph>
      <Paragraph>Total cost: <span>&#36; {totalCost || 0}</span></Paragraph>
      <Button
        disabled={totalItems > 0 ? false : true}
        onClick={() => {
          dispatch(sendOrder());
          setOrderSent(true);
        }}
      >Checkout</Button>
    </Summary>
  )
}

function getOffsetTop(ref) {
  return ref?.current?.parentElement?.parentElement?.offsetTop
    + ref?.current?.parentElement?.offsetTop || 0;
}

function getWindowSize() {
  const {innerWidth} = window;

  return getViewSize(innerWidth);
}

function getTotals(cartItems) {
  let totals = cartItems.reduce((prevValue, currValue) => {
    return ({
      totalItems: prevValue.totalItems + currValue.quantity, 
      totalCost: prevValue.totalCost + (currValue.price * currValue.quantity)
    })
  }, {totalItems: 0, totalCost: 0})

  totals.totalItems = Math.round(totals.totalItems * 100) / 100
  totals.totalCost =  Math.round(totals.totalCost * 100) / 100

  return totals
}

export default CartSummary