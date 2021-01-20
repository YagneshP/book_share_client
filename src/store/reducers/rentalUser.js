import * as actionTypes from "../actionTypes";
const intialState = {
  rentalUser: null,
};
const rentalUserReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.RENTAL_USERS:
      return {
        rentalUser: action.payload,
      };
    case actionTypes.CLEAR_RENTAL_USERS:
      return {
        rentalUser: null,
      };
    default:
      return state;
  }
};

export default rentalUserReducer;
