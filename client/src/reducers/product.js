import { PRODUCTS_FETCHED, PRODUCT_FETCHED } from "../actions/actionTypes";

const INITIAL_STATE = {
  products: [],
  selectedProduct: {},
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCTS_FETCHED:
      return { ...state, ...payload };
    case PRODUCT_FETCHED:
      return { ...state, selectedProduct: payload };
    default:
      return state;
  }
};
