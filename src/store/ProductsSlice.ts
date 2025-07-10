import { createSlice } from "@reduxjs/toolkit";
import type { ProductTypes } from "../pages/Products";

const initialState = {
  products: [] as ProductTypes[],
};

export const ProductSlice = createSlice({
  name: "ProductsData",
  initialState,
  reducers: {
    loadProducts: (state, action: { payload: ProductTypes[] }) => {
      state.products = action.payload;
    },
  },
});

export const { loadProducts } = ProductSlice.actions;

export default ProductSlice.reducer;
