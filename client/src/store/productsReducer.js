import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (filter = null, thunkAPI) => {
    if (filter) {
      var { data } = await axios.get(
        `product?category=${filter.category}` +
          `${filter.color ? `&color=${filter.color}` : ""}` +
          `${filter.size ? `&size=${filter.size}` : ""}`
      );
    } else {
      var { data } = await axios.get(`product`);
    }

    return data;
  }
);

const initialState = {
  data: null,
  isLoading: true,
  isError: false,
};

export const ProductsSlicer = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.data = action.payload.payload.filter(
        (item) => item.category != "electronics"
      );
      state.isLoading = false;
      state.isError = false;
    });
  },
});

// Action creators are generated for each case reducer function

export default ProductsSlicer.reducer;
