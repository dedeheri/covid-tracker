import {
  GET_DATA_BY_HISTORY,
  GET_DATA_BY_HISTORY_AND_COUNTRY,
  REMOVE_DATA_BY_HISTORY,
} from "../action-type";

const initalState = {
  history: {},
  loading: true,
};

const history = (state = initalState, action) => {
  switch (action.type) {
    case GET_DATA_BY_HISTORY: {
      return {
        ...state,
        history: action.payload,
        loading: false,
      };
    }
    case GET_DATA_BY_HISTORY_AND_COUNTRY: {
      return {
        ...state,
        history: action.payload,
        loading: false,
      };
    }
    case REMOVE_DATA_BY_HISTORY: {
      return {
        ...state,
        history: {},
        loading: true,
      };
    }
    default:
      return state;
  }
};

export default history;
