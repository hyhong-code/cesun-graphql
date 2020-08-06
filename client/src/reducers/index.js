import { combineReducers } from "redux";

import product from "./product";
import user from "./user";
import order from "./order";

export default combineReducers({ product, user, order });
