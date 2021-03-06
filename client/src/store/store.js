import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import productReducer from "./productReducer";
import productsReducer from "./productsReducer";
import userReducer from "./userReducer";

export const store = configureStore({
  reducer: {
    product: productReducer,
    products: productsReducer,
    cart: cartReducer,
    user:userReducer
  },
});
