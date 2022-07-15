import { configureStore, combineReducers } from "@reduxjs/toolkit";
import wizelineReducer from "./reducers/wizelineReducer";
import apiStoreReducer from "./reducers/apiStoreReducer";
import { loadFromLocalStorage } from './DataManagement'

const reducers = combineReducers({
  "localStore": wizelineReducer,
  "apiStore": apiStoreReducer
})

export const store = configureStore({
  devTools: true,
  reducer: reducers,
  preloadedState: loadFromLocalStorage()
})

