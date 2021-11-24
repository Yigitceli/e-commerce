import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productReducer";
import productsReducer from "./productsReducer";

export const store = configureStore({
  reducer: {
    product: productReducer,
    products: productsReducer,
  },
});
