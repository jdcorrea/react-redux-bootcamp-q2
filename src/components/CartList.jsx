import React, { useState, useEffect } from 'react'
import CartItem from './CartItem';
import { useSelector } from "react-redux";
import { useAuth } from '../context/AuthContext';
import usePosts from './customHooks/useProducts';
import { getProducts } from '../state/reducers/apiStoreReducer';
import { useDispatch } from 'react-redux/es/exports';

import { ItemList } 
from '../styles/components/CartList.styles.js';

const CartList = () => {
  const dispatch = useDispatch();
  const { products } = usePosts();
  const { currentUser } = useAuth();
  const [productList, setProductList] = useState(products);
  const cartItems = useSelector(state => {
    if (!currentUser) return [];
    const userCart = state.localStore.users.find(user => user.id === currentUser);
    const cartList = userCart?.cartItems?.map(cartItem => {
      const details =  products.find(item => item.id === cartItem.id)
      return {
        ...details,
        quantity: cartItem.quantity
      }
    })
    return cartList || [];
  });

  useEffect(() => {
    if (productList == null) {
      dispatch(getProducts());
      setProductList(products);
    }
  }, [])
  
  return cartItems
    ? 
      <ItemList>
        {
          cartItems.map(item => {
            return <CartItem {...item} key={item.id}/>
          })
        }
      </ItemList>
    : <div>Empty</div>;
}

export default CartList