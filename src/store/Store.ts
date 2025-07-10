import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
import ProductReducer from "./ProductsSlice";

export const store = configureStore({
  reducer: {
    userData: UserReducer,
    productsData: ProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
