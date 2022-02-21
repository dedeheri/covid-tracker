import { GET_COUNTRIES } from "../action-type";

const initalState = {
  countries: {},
  loading: true,
};

const countries = (state = initalState, action) => {
  switch (action.type) {
    case GET_COUNTRIES: {
      return {
        ...state,
        countries: action.payload,
        loading: false,
      };
    }

    default:
      return state;
  }
};

export default countries;
