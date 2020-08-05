import axios from "axios";

import { PRODUCTS_FETCHED, PRODUCT_FETCHED } from "./actionTypes";

export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/products");
    dispatch({
      type: PRODUCTS_FETCHED,
      payload: res.data.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getProduct = (slug) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/products/${slug}`);
    console.log(res.data);
    dispatch({
      type: PRODUCT_FETCHED,
      payload: res.data.data.product,
    });
  } catch (error) {
    console.error(error);
  }
};
