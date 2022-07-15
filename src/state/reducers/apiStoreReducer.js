import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null
}

export const getProducts = createAsyncThunk(
  "apiWizelineStore/getProducts",
  async (_, { rejectWithValue, requestId, signal }) => {
    //fetch products
    try {
      const response = await fetch('/.netlify/functions/products', {
        signal
      });

      if(!response.ok){
        return rejectWithValue("Error fetching the products");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const apiStoreReducer = createSlice({
    name: 'apiWizelineStore',
    initialState: initialState,
    extraReducers: (builder) => {
      builder
        .addCase(getProducts.pending, (state, action) => {
          state.loading = true;
          state.error = ''
        })
        .addCase(getProducts.fulfilled, (state, action) => {
          state.products = action.payload.items;
          state.loading = false;
          state.error = ''
        })
        .addCase(getProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
    }
});

export const selectAllProducts = (state) => state.apiStore.products;
export const selectProductsLoading = (state) => state.apiStore.loading;
export const selectProductsError = (state) => state.apiStore.error;

export default apiStoreReducer.reducer;