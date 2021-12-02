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

const ProductsSlicer = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortProducts: (state, action) => {
      switch (action.payload) {
        case "newest":
          state.data = state.data?.sort((a, b) => {
            return new Date(a.created_at) - new Date(b.created_at);
          });
          break;
        case "asc":
          state.data = state.data?.sort((a, b) => {
            return a.price - b.price;
          });
          break;
        case "desc":
          state.data = state.data?.sort((a, b) => {
            return b.price - a.price;
          });
          break;
        default:
          break;
      }
    },
  },
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

export const { sortProducts } = ProductsSlicer.actions;

export default ProductsSlicer.reducer;
