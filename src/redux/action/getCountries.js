import axios from "axios";
import { GET_COUNTRIES } from "../action-type";

export const getCountries = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        "https://disease.sh/v3/covid-19/countries"
      );

      const countries = data.map((countries) => ({
        countrieName: countries.country,
        cases: countries.cases,
        countrieInfo: {
          flag: countries.countryInfo.flag,
          iso2: countries.countryInfo.iso2,
          lat: countries.countryInfo.lat,
          long: countries.countryInfo.long,
        },
        deaths: countries.deaths,
        recovered: countries.recovered,
      }));

      dispatch({ type: GET_COUNTRIES, payload: countries });
    } catch (error) {
      console.error(error);
    }
  };
};
