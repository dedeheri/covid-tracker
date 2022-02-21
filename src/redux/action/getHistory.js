import axios from "axios";
import {
  GET_DATA_BY_HISTORY,
  GET_DATA_BY_HISTORY_AND_COUNTRY,
} from "../action-type";

export const getHistory = (day) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://disease.sh/v3/covid-19/historical/all?lastdays=${day}`
      );
      dispatch({ type: GET_DATA_BY_HISTORY, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getHistoryByCountries = (day, params) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://disease.sh/v3/covid-19/historical/${params}?lastdays=${day}`
      );

      dispatch({
        type: GET_DATA_BY_HISTORY_AND_COUNTRY,
        payload: data.timeline,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
