import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Maps from "./Components/Maps";
import { Main } from "./Components/Main";

import { useDispatch, useSelector } from "react-redux";
import { getCovidData, getCovidDataByCountries } from "./redux/action/data";
import { getCountries } from "./redux/action/getCountries";
import Container from "./Components/Container";
import Countrie from "./Components/Countrie";
import Grid from "./Components/Grid";
import Chart from "./Components/Chart";
import {
  REMOVE_DATA_BY_HISTORY,
  REMOVE_DATA_SELECTED,
  REMOVE_VACCINE_BY_HISTORY,
} from "./redux/action-type";
import ChartVaccine from "./Components/ChartVaccine";
import News from "./Components/News";
import ChartRecovered from "./Components/ChartRecovered";
import ChartDeaths from "./Components/ChartDeaths";

function App() {
  const [countrie, setCountrie] = useState({
    countrieName: "Seluruh Dunia",
    countrieInfo: {
      flag: "https://freesvg.org/storage/img/thumb/United-Globe.png",
    },
  });

  const { total, loading } = useSelector((state) => state.total);
  const { countries, loading: loadingCountrie } = useSelector(
    (state) => state.countries
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountries());
  }, []);

  useEffect(() => {
    if (countrie.countrieName === "Seluruh Dunia") {
      dispatch(getCovidData());
    } else {
      dispatch(getCovidDataByCountries(countrie.countrieInfo.iso2));
    }

    return () => {
      dispatch({ type: REMOVE_DATA_SELECTED });
      dispatch({ type: REMOVE_DATA_BY_HISTORY });
      dispatch({ type: REMOVE_VACCINE_BY_HISTORY });
    };
  }, [countrie]);

  return (
    <>
      <Navbar />
      <Maps coordinates={countries} />
      <Container>
        <Grid>
          <Main
            loading={loading}
            total={total}
            countries={countries}
            countrie={countrie}
            setCountrie={setCountrie}
          ></Main>
          <Countrie loading={loadingCountrie} data={countries} />
        </Grid>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 md:-mt-80">
          <div className="col-span-2">
            <Chart countrie={countrie} />
            <ChartRecovered countrie={countrie} />
            <ChartDeaths countrie={countrie} />
            <ChartVaccine countrie={countrie} />
            <News />
          </div>
        </div>
      </Container>
    </>
  );
}

export default App;
