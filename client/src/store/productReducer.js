import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchProduct = createAsyncThunk(
  "fetchProduct",
  async (productId, thunkAPI) => {
    const { data } = await axios.get(`product/${productId}`);    
    return data;
  }
);

const initialState = {
  data: [],
  isLoading: true,
  isError: false,
};

export const ProductSlicer = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.data = action.payload.payload;
      state.isLoading = false;
      state.isError = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } =
  ProductSlicer.actions;

export default ProductSlicer.reducer;
