import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productDetail: {},
    isLoading: false,
    error: false,
    pageDetails: {},
    totalpage: null,
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
      console.log(action.payload.items);
      state.products = action.payload.items;
      state.pageDetails = action.payload.meta;
      const { totalItems, itemsPerPage } = action.payload.meta;
      state.totalpage = Math.ceil(totalItems / itemsPerPage);
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
