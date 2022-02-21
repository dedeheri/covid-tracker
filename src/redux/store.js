import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import combineReducer from "./reducer";

const store = createStore(
  combineReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
