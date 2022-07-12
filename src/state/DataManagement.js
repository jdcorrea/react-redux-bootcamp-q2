// import { store } from "./store";
/* userData structure

const StoreData = {
  "activeUser": null,
  "users": [
    {
      "id": 123,
      "cartItems": [
        {
          "id": 3,
          "quantity": 4
        },
        {
          "id": 7,
          "quantity": 2
        },
      ]
    },
    {
      "id": 490,
      "cartItems": [
      ]
    }
  ]
}
*/

export const initialState = {
  storeData: {
    "activeUser": 490,
    "users": [
      {
        "id": 123,
        "cartItems": [
          {
            "id": 3,
            "quantity": 4
          },
          {
            "id": 7,
            "quantity": 2
          },
        ]
      },
      {
        "id": 490,
        "cartItems": [
        ]
      }
    ]
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