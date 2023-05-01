// * THIS FILE CONTAINS ALL THE API CALLS TO ENDPOINTS AND DISPATCHES THE RESPONSE DATA TO REDUCER
//FOR EACH CALL :
//we set loading to true > await response data > dispatch data to reducer  > set loading to false
import axios from "axios";
import { BASE_URL } from "../constants/urls";
import {
  getCategoryStart,
  getCategorySuccess,
  getCategoryFailure,
} from "../redux/categorySlice";
import {
  getProductDetailStart,
  getProductDetailSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
} from "../redux/productSlice";

// for getting all the categories
export const getAllcategories = async (dispatch) => {
  dispatch(getCategoryStart());
  try {
    const res = await axios.get(`${BASE_URL}/categories`);
    dispatch(getCategorySuccess(res.data));
  } catch (err) {
    dispatch(getCategoryFailure());
  }
};

//for getting products as per the category
export const getProductsByCategory = async (
  dispatch,
  categoryId,
  page = 1,
  limit = 12
) => {
  dispatch(getProductStart());
  try {
    const res = await axios.get(
      `${BASE_URL}/products/category/${categoryId}?limit=${limit}&page=${page}`
    );
    // console.log(res.data);
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

//for getting individual product details
export const getProductDetailById = async (dispatch, productId) => {
  dispatch(getProductDetailStart());
  try {
    const res = await axios.get(`${BASE_URL}/products/${productId}`);
    // console.log(res.data);
    dispatch(getProductDetailSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};
