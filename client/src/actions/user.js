import axios from "axios";

import gql from "../graphql/index";
import setJwtHeader from "../utils/setJwtHeader";

import {
  USER_LOADED,
  USER_LOGGEDIN,
  USER_REGISTERED,
  AUTH_ERROR,
  LOGOUT,
} from "./actionTypes";

export const register = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/graphql",
      gql.register(formData),
      gql.config()
    );
    console.log(res.data);
    dispatch({
      type: USER_REGISTERED,
      payload: res.data.data.register.token,
    });
    dispatch(loadUser());
  } catch (error) {
    console.error(error.response);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/graphql", gql.login(formData), gql.config());
    console.log(res.data);
    dispatch({
      type: USER_LOGGEDIN,
      payload: res.data.data.login.token,
    });
    dispatch(loadUser());
  } catch (error) {
    console.error(error);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem("jwt")) {
    setJwtHeader(localStorage.getItem("jwt"));
  }
  try {
    const res = await axios.post("/graphql", gql.loadUser(), gql.config());
    dispatch({
      type: USER_LOADED,
      payload: res.data.data.loadUser,
    });
  } catch (error) {
    console.error(error.response);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
