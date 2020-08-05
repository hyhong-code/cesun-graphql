import axios from "axios";

import setJwtHeader from "../utils/setJwtHeader";

import {
  USER_LOADED,
  USER_LOGGEDIN,
  USER_REGISTERED,
  AUTH_ERROR,
  LOGOUT,
} from "./actionTypes";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const register = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/v1/auth/register", formData, config);
    console.log(res.data);
    dispatch({
      type: USER_REGISTERED,
      payload: res.data.data.token,
    });
    dispatch(loadUser());
  } catch (error) {
    console.error(error);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/v1/auth/login", formData, config);
    dispatch({
      type: USER_LOGGEDIN,
      payload: res.data.data.token,
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
    const res = await axios.get("/api/v1/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data.data,
    });
  } catch (error) {
    console.error(error);
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
