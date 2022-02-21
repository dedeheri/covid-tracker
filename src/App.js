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
import Fotter from "./Components/Fotter";
import Chart from "./Components/Chart";
import {
  REMOVE_DATA_BY_HISTORY,
  REMOVE_DATA_SELECTED,
  REMOVE_VACCINE_BY_HISTORY,
} from "./redux/action-type";
import ChartVaccine from "./Components/ChartVaccine";
import News from "./Components/News";
import Grid2 from "./Components/Grid2";

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

        <Grid2>
          <Chart countrie={countrie} />
          <ChartVaccine countrie={countrie} />
          <News />
        </Grid2>
      </Container>
      <Fotter />
    </>
  );
}

export default App;
