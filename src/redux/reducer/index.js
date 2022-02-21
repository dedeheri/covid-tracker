import { combineReducers } from "redux";

import countries from "./countries";
import data from "./data";
import history from "./history";
import news from "./news";
import vaccine from "./vaccine";

const combineReducer = combineReducers({
  total: data,
  countries: countries,
  history: history,
  vaccine: vaccine,
  news: news,
});

export default combineReducer;
