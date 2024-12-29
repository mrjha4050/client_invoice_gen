import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productslice";
import navbarReducer from "../features/Navbar/navbarSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth : authReducer,
    navbar: navbarReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;