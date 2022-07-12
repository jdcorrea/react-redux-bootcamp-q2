import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from '../DataManagement'

const initialState = loadFromLocalStorage();

export const wizelineReducer = createSlice({
    name: 'wizelineStore',
    initialState: initialState,
    reducers: {
      getActiveUser: (state) => {
        return state.storeData.activeUser
      },
      setActiveUser: (state, action) => {
        state.storeData.activeUser = action.payload.id;
      },
    }
});

export const {getActiveUser, setActiveUser} = wizelineReducer.actions;

export default wizelineReducer.reducer;