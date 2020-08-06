import {
  USER_LOADED,
  USER_REGISTERED,
  USER_LOGGEDIN,
  AUTH_ERROR,
  LOGOUT,
} from "../actions/actionTypes";

import setJwtHeader from "../utils/setJwtHeader";

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {},
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGGEDIN:
    case USER_REGISTERED:
      localStorage.setItem("jwt", payload);
      setJwtHeader(payload);
      return { ...state, isAuthenticated: true };
    case USER_LOADED:
      return { ...state, isAuthenticated: true, user: payload };
    case LOGOUT:
    case AUTH_ERROR:
      localStorage.removeItem("jwt");
      return INITIAL_STATE;
    default:
      return state;
  }
};
