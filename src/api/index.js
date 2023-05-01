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

//set loading as true
// call api in try catch
//set loading false
//call this in useefferct
export const getAllcategories = async (dispatch) => {
  dispatch(getCategoryStart());
  try {
    const res = await axios.get(`${BASE_URL}/categories`);
    dispatch(getCategorySuccess(res.data));
  } catch (err) {
    dispatch(getCategoryFailure());
  }
};

export const getProductsByCategory = async (dispatch, categoryId, page = 1) => {
  dispatch(getProductStart());
  try {
    const res = await axios.get(
      `${BASE_URL}/products/category/${categoryId}?limit=10&page=${page}`
    );
    console.log(res.data);
    dispatch(getProductSuccess(res.data.items));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const getProductDetailById = async (dispatch, productId) => {
  dispatch(getProductDetailStart());
  try {
    const res = await axios.get(`${BASE_URL}/products/${productId}`);
    dispatch(getProductDetailSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};
