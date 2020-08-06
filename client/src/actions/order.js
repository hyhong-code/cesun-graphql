import axios from "axios";

import gql from "../graphql/index";
import { ORDERS_FETCHED, ORDER_FETCHED, ORDER_ERROR } from "./actionTypes";

export const listUserOrders = () => async (dispatch) => {
  try {
    const res = await axios.post(
      "/graphql",
      gql.listUserOrders(),
      gql.config()
    );
    console.log(res.data);
    dispatch({
      type: ORDERS_FETCHED,
      payload: res.data.data.listUserOrders,
    });
  } catch (error) {
    dispatch({
      type: ORDER_ERROR,
    });
    console.error(error);
  }
};

export const getUserOrder = (orderId) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/graphql",
      gql.getUserOrder(orderId),
      gql.config()
    );
    console.log(res.data);
    dispatch({
      type: ORDER_FETCHED,
      payload: res.data.data.getUserOrder,
    });
  } catch (error) {
    dispatch({
      type: ORDER_ERROR,
    });
    console.error(error);
  }
};
