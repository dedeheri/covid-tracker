import {
  GET_DATA,
  GET_DATA_BY_COUNTRY,
  REMOVE_DATA_SELECTED,
} from "../action-type";

const initalState = {
  total: "",
  loading: true,
};

const data = (state = initalState, action) => {
  switch (action.type) {
    case GET_DATA: {
      return {
        ...state,
        total: action.payload,
        loading: false,
      };
    }
    case GET_DATA_BY_COUNTRY: {
      return {
        ...state,
        total: action.payload,
        loading: false,
      };
    }
    case REMOVE_DATA_SELECTED: {
      return {
        ...state,
        total: {},
        loading: true,
      };
    }
    default:
      return state;
  }
};

export default data;
