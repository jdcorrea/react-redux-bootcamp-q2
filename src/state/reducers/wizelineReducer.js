import { createSlice } from "@reduxjs/toolkit";

export const initialValue = {
  users: []
}

export const wizelineReducer = createSlice({
  name: 'localWizelineStore',
  initialState: initialValue,
  reducers: {
    addProductToCart: (state, action) => {
      if (!action.payload.id || !action.payload.productId) return state;
      const userIndex = state.users.findIndex(user => user.id === action.payload.id);
      if (userIndex >= 0) {
        const indexOfItemInCart = state.users[userIndex].cartItems.findIndex(item => item.id === action.payload.productId);
        if (indexOfItemInCart >= 0) {
          state.users[userIndex].cartItems[indexOfItemInCart]['quantity'] += 1;
        } else {
          state.users[userIndex].cartItems.push({
            id: action.payload.productId,
            quantity: 1
          })
        }
        return state
      }

      throw new Error('user not found in localStorage, please logout and login back');
    },
    incrementQuantityBy1: (state, action) => {
      if (!action?.payload?.id || !action?.payload?.productId) return state;
      const userIndex = state.users.findIndex(user => user.id === action.payload.id);
      const CartItemIndex = state.users[userIndex].cartItems.findIndex(cartItem => cartItem.id === action.payload.productId);
      state.users[userIndex].cartItems[CartItemIndex]['quantity'] += 1;
    },
    decrementQuantityBy1: (state, action) => {
      if (!action?.payload?.id || !action?.payload.productId) return state;
      const userIndex = state.users.findIndex(user => user.id === action.payload.id);
      const CartItemIndex = state.users[userIndex].cartItems.findIndex(cartItem => cartItem.id === action.payload.productId);
      if (state.users[userIndex].cartItems[CartItemIndex]['quantity'] > 0) state.users[userIndex].cartItems[CartItemIndex]['quantity'] -= 1;
    },
    setItemQuantity: (state, action) => {
      if (!action?.payload?.id || !action.payload.productId) return state;
      const userIndex = state.users.findIndex(user => user.id === action.payload.id);
      const CartItemIndex = state.users[userIndex].cartItems.findIndex(cartItem => cartItem.id === action.payload.productId);
      state.users[userIndex].cartItems[CartItemIndex]['quantity'] = action.payload.quantity;
    },
    deleteProductFromCart: (state, action) => {
      if (!action?.payload?.id || !action.payload.productId) return state;
      const userIndex = state.users.findIndex(user => user.id === action.payload.id);
      const CartItemIndex = state.users[userIndex].cartItems.findIndex(cartItem => cartItem.id === action.payload.productId);
      state.users[userIndex].cartItems.splice(CartItemIndex, 1);
    },
    addUser: (state, action) => {
      if (!action?.payload?.id) return state;
      if (state.users.find(user => user.id === action.payload.id)) return state;
      state.users.push({
        id: action.payload.id,
        cartItems: []
      })
    },
    cleanUpUserCart: (state, action) => {
      if (!action?.payload?.id) return state;
      const userIndex = state.users.findIndex(user => user.id === action.payload.id);
      state.users[userIndex].cartItems = [];
    }
  }
});

export const {
  addProductToCart,
  incrementQuantityBy1,
  decrementQuantityBy1,
  setItemQuantity,
  deleteProductFromCart,
  addUser,
  cleanUpUserCart
} = wizelineReducer.actions;

export default wizelineReducer.reducer;