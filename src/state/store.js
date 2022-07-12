import { configureStore } from "@reduxjs/toolkit";
import wizelineReducer from "./reducers/wizelineReducer";
import { loadFromLocalStorage } from './DataManagement'


export const store = configureStore({
  devTools: true,
  reducer: wizelineReducer,
  preloadedState: loadFromLocalStorage()
})

