//*THIS FILE CONTAINS REDUX OF CATEGORIES
//it contains initialstate , actions and reducers related to CATEGORY

import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    isLoading: false,
    error: false,
  },
  reducers: {
    getCategoryStart: (state) => {
      state.isLoading = true;
      state.error = false;
      state.categories = [];
    },
    getCategorySuccess: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    },
    getCategoryFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  addProduct,
  getCategoryFailure,
  getCategoryStart,
  getCategorySuccess,
} = categorySlice.actions;
export default categorySlice.reducer;
