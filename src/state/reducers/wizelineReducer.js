import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from '../DataManagement';

const initialState = loadFromLocalStorage();

export const wizelineReducer = createSlice({
    name: 'wizelineStore',
    initialState: initialState,
    getActiveUser: () => {
      console.log('testing fundamentals')
    },
    reducers: {
      setActiveUser: (state, action) => {
        state.storeData.activeUser = 
          action.payload.id != null ? parseInt(action.payload.id) : null
      },
      addProductToCart: (state, action) => {
        const newUsersData = state.storeData.users.map(user => {
          console.log('user', action)
          if (user.id === action.payload.id){
            const indexOfItemInCart = user.cartItems.findIndex(item => item.id === action.payload.productId)
            if (indexOfItemInCart >= 0) {
              const newUserCart = user.cartItems.map((item, idx) => {
                if(idx === indexOfItemInCart) {
                  return {
                    ...item,
                    quantity: item.quantity + 1
                  }
                }
                return {...item}
              })
              return {
                ...user,
                cartItems: [...newUserCart]
              }
            } else {
              console.log('no item')
              return {
                ...user, 
                cartItems: [
                  ...user.cartItems, {
                    id: action.payload.productId,
                    quantity: 1
                  }
                ]
              }
            }
          }
          return {...user}
        })
        state.storeData.users = newUsersData;
      },
      incrementQuantityBy1: (state, action) => {
        const newUsersData = state.storeData.users.map(user => {
          if (user.id === action.payload.id) {
            const userCartItems = user.cartItems.map(item => {
              if(item.id === action.payload.cartItemId) {
                return {
                  ...item, quantity: item.quantity + 1
                }
              }
              return {...item}
            })
            return {
              ...user,
              cartItems: [...userCartItems]
            } 
          }
          return {...user}
        })
        state.storeData.users = newUsersData;
      },
      decrementQuantityBy1: (state, action) => {
        if (!action.payload.id) return state;
        const newUsersData = state.storeData.users.map(user => {
          if (user.id === action.payload.id) {
            const userCartItems = user.cartItems.map(item => {
              if(item.id === action.payload.cartItemId && item.quantity > 0) {
                return {
                  ...item, quantity: item.quantity - 1
                }
              }
              return {...item}
            })
            return {
              ...user,
              cartItems: [...userCartItems]
            } 
          }
          return {...user}
        })
        state.storeData.users = newUsersData;
      },
      setItemQuantity: (state, action) => {
        if (!action.id) return state;
        const newUsersData = state.storeData.users.map(user => {
          if (user.id === action.payload.id) {
            const userCartItems = user.cartItems.map(item => {
              if(item.id === action.payload.cartItemId) {
                return {
                  ...item, quantity: action.payload.quantity
                }
              }
              return {...item}
            })
            return {
              ...user,
              cartItems: [...userCartItems]
            } 
          }
          return {...user}
        })
        state.storeData.users = newUsersData;
      },
      deleteProductFromCart: (state, action) => {
        if (!action.payload.id) return state;
        const newUsersData = state.storeData.users.map(user => {
          if (user.id === action.payload.id) {
            return {
              ...user,
              cartItems: user.cartItems.filter(item => item.id !== action.payload.productId)
            }
          }
          return {...user}
        })
        state.storeData.users = newUsersData;
      },
    }
});

export const {
  setActiveUser, 
  addProductToCart, 
  incrementQuantityBy1, 
  decrementQuantityBy1,
  setItemQuantity,
  deleteProductFromCart
} = wizelineReducer.actions;

export default wizelineReducer.reducer;