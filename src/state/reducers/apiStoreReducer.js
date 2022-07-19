import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
  order: {
    id: null,
    message: ''
  }
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

export const sendOrder = createAsyncThunk(
  "apiWizelineStore/sendOrder",
  async (_, { rejectWithValue, requestId, signal }) => {
    //fetch products
    try {
      const response = await fetch('/.netlify/functions/sendOrder', {
        signal
      });

      if(!response.ok){
        return rejectWithValue("Error sending the order");
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
    reducers: {
      cleanProductsList: (state, action) => {
        state.products = []
      },
      cleanOrder: (state, action) => {
        state.order = {
          id: null,
          message: ''
        }
      }

    },
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
        .addCase(sendOrder.pending, (state, action) => {
          state.order.id = null;
          state.order.message = '';
          state.loading = true;
          state.error = ''
        })
        .addCase(sendOrder.fulfilled, (state, action) => {
          state.order.id = action.payload.order;
          state.order.message = action.payload.message;
          state.loading = false;
          state.error = ''
        })
        .addCase(sendOrder.rejected, (state, action) => {
          state.order.id = null;
          state.order.message = action.payload.message;
          state.loading = false;
          state.error = action.payload;
        })
    }
});

export const selectAllProducts = (state) => state.apiStore.products;
export const selectProductsLoading = (state) => state.apiStore.loading;
export const selectProductsError = (state) => state.apiStore.error;
export const selectOrderStatus = (state) => state.apiStore.order;

export const { cleanProductsList, cleanOrder } = apiStoreReducer.actions;

export default apiStoreReducer.reducer;