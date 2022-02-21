import axios from "axios";
import {
  GET_VACCINE_BY_HISTORY,
  GET_VACCINE_BY_HISTORY_AND_COUNTRY,
} from "../action-type";

export const getVaccine = (day) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=${day}&fullData=false`
      );

      dispatch({ type: GET_VACCINE_BY_HISTORY, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getVaccineByCountries = (day, params) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${params}?lastdays=${day}&fullData=false`
      );

      dispatch({
        type: GET_VACCINE_BY_HISTORY_AND_COUNTRY,
        payload: data.timeline,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
