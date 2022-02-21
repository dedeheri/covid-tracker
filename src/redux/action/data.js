import axios from "axios";

import { GET_DATA, GET_DATA_BY_COUNTRY } from "../action-type";

const URL = "https://disease.sh/v3/covid-19/all";
export const getCovidData = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(URL);
      dispatch({ type: GET_DATA, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCovidDataByCountries = (params) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://disease.sh/v3/covid-19/countries/${params}?strict=false`
      );
      dispatch({ type: GET_DATA_BY_COUNTRY, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
};
