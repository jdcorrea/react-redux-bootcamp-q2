// import { store } from "./store";
/* userData structure

const StoreData = {
  "users": [
    {
      "id": string,
      "cartItems": [
        {
          "id": numeric,
          "quantity": numeric
        },
      ]
    },
  ]
}
*/

export const initialState = {
  localStore: {
    users:[]
  }
}

const STORAGE_KEY = 'WizelineStore';

export function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

export function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem(STORAGE_KEY);
    if (serialisedState === null){
      saveToLocalStorage(initialState);
      return initialState;
    } 
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}