import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

const initialState = {
  data: [],
  isLoading: true,
  isError: false,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.data.push(action.payload);
    },
    removeItem: (state, action) => {
      state.data.filter((item) => item.id != action.payload.id);
    },
    updateItem: (state, action) => {
      const itemIndex = state.data.findIndex(
        (item) => item.id == action.payload.id
      );
      state.data[itemIndex].quantity = action.payload.quantity;
    },
  },
  extraReducers: (builder) => {},
});

// Action creators are generated for each case reducer function

export const { addItem, removeItem, updateItem } = CartSlice.actions;

export default CartSlice.reducer;
