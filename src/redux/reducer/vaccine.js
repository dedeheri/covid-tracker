import {
  GET_VACCINE_BY_HISTORY,
  GET_VACCINE_BY_HISTORY_AND_COUNTRY,
  REMOVE_VACCINE_BY_HISTORY,
} from "../action-type";

const initalState = {
  vaccine: {},
  loading: true,
};

const vaccine = (state = initalState, action) => {
  switch (action.type) {
    case GET_VACCINE_BY_HISTORY: {
      return {
        ...state,
        vaccine: action.payload,
        loading: false,
      };
    }

    case GET_VACCINE_BY_HISTORY_AND_COUNTRY: {
      return {
        ...state,
        vaccine: action.payload,
        loading: false,
      };
    }

    case REMOVE_VACCINE_BY_HISTORY: {
      return {
        ...state,
        vaccine: {},
        loading: true,
      };
    }

    default:
      return state;
  }
};

export default vaccine;
