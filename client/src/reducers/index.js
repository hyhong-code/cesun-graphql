import { combineReducers } from "redux";

import product from "./product";
import auth from "./auth";
import order from "./order";

export default combineReducers({ product, auth, order });
