import axios from "axios";

import gql from "../graphql/product";
import { PRODUCTS_FETCHED, PRODUCT_FETCHED } from "./actionTypes";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const listProducts = () => async (dispatch) => {
  try {
    const res = await axios.post("/graphql", gql.listProducts(), config);
    dispatch({
      type: PRODUCTS_FETCHED,
      payload: res.data.data.listProducts,
    });
  } catch (error) {
    console.error(error.response);
  }
};

export const getProduct = (slug) => async (dispatch) => {
  try {
    const res = await axios.post("/graphql", gql.getProduct(slug), config);
    console.log(res.data);
    dispatch({
      type: PRODUCT_FETCHED,
      payload: res.data.data.getProduct,
    });
  } catch (error) {
    console.error(error.response);
  }
};
