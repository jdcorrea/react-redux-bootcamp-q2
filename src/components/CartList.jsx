import React from 'react'
import CartItem from './CartItem';
import { useSelector } from "react-redux";
import { useAuth } from '../context/AuthContext';

import Products from '../utils/Products.json';

import { ItemList } 
from '../styles/components/CartList.styles.js';

const CartList = () => {
  const productsItems = Products?.data?.products?.items || [];
  const { currentUser } = useAuth();
  const cartItems = useSelector(state => {
    if (!currentUser) return [];
    const userCart = state.localStore.users.find(user => user.id === currentUser);
    const cartList = userCart?.cartItems?.map(cartItem => {
      const details =  productsItems.find(item => item.id === cartItem.id)
      return {
        ...details,
        quantity: cartItem.quantity
      }
    })
    return cartList || [];
  });

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