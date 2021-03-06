import { SET_PRODUCTS } from "../actions/products";

const initialState = {
  availableProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        availableProducts: action.products,
      };
  }
  return state;
};
