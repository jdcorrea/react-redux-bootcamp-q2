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
      console.log('data', data)
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
        })
        .addCase(getProducts.fulfilled, (state, action) => {
          state.loading = false;
        })
        .addCase(getProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
    }
});

export const selectAllProducts = (state) => state.apiWizelineStore.products;
export const selectProductsLoading = (state) => state.apiWizelineStore.loading;
export const selectProductsError = (state) => state.apiWizelineStore.error;

export default apiStoreReducer.reducer;