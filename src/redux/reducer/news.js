import { GET_NEWS, REMOVE_NEWS } from "../action-type";

const initialState = {
  news: {},
  loading: true,
  loadingPerSize: true,
};

const news = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS: {
      return {
        ...state,
        news: action.payload,
        loading: false,
        loadingPerSize: false,
      };
    }

    case REMOVE_NEWS: {
      return {
        ...state,
        loadingPerSize: true,
      };
    }

    default:
      return state;
  }
};

export default news;
