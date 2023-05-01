import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productDetail: {},
    isLoading: false,
    error: false,
  },
  reducers: {
    getProductStart: (state) => {
      state.isLoading = true;
      state.error = false;
      state.products = [];
    },
    getProductDetailStart: (state) => {
      state.isLoading = true;
      state.error = false;
      state.productDetail = [];
    },
    getProductSuccess: (state, action) => {
      state.isLoading = false;
      state.error = false;
      console.log(action.payload);
      state.products = action.payload;
    },
    getProductDetailSuccess: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.productDetail = action.payload;
    },
    getProductFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  getProductDetailSuccess,
  getProductDetailStart,
} = productSlice.actions;
export default productSlice.reducer;
