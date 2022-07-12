import React from 'react'
import CartItem from './CartItem';
import { useSelector } from "react-redux";

import Products from '../utils/Products.json';

import { ItemList } 
from '../styles/components/CartList.styles.js';

const CartList = () => {
  const productsItems = Products?.data?.products?.items || [];
  const { activeUser } = useSelector(state => state.storeData);
  const cartItems = useSelector(state => {
    if (!activeUser) return [];
    const userCart = state.storeData.users.find(user => user.id === activeUser);
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