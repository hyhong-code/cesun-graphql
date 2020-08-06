import axios from "axios";

import gql from "../graphql/index";
import { PRODUCTS_FETCHED, PRODUCT_FETCHED } from "./actionTypes";

export const listProducts = () => async (dispatch) => {
  try {
    const res = await axios.post("/graphql", gql.listProducts(), gql.config());
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
    const res = await axios.post(
      "/graphql",
      gql.getProduct(slug),
      gql.config()
    );
    dispatch({
      type: PRODUCT_FETCHED,
      payload: res.data.data.getProduct,
    });
  } catch (error) {
    console.error(error.response);
  }
};
