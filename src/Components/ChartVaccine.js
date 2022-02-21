import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loading-icons";
import Filter from "./FIlter";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getVaccine, getVaccineByCountries } from "../redux/action/getVaccine";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartVaccine = ({ countrie }) => {
  const [day, setDay] = useState(7);

  const days = {
    "7 Hari": 7,
    "1 Bulan": 30,
    "6 Bulan": 182,
    Total: "all",
  };

  const { vaccine, loading } = useSelector((state) => state.vaccine);
  const dispatch = useDispatch();

  useEffect(() => {
    if (countrie.countrieName === "Seluruh Dunia") {
      dispatch(getVaccine(day.v || 7));
    } else {
      dispatch(getVaccineByCountries(day.v || 7, countrie.countrieInfo.iso2));
    }
  }, [day, countrie]);

  const dataCharts = (vaccine) => {
    const timestamps = [];
    const cases = [];

    for (let [k] of Object.entries(vaccine || "")) {
      let options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      timestamps.push(new Date(k).toLocaleDateString("in-IN", options));
    }
    for (let [k, v] of Object.entries(vaccine || "")) {
      cases.push(v);
    }

    return {
      timestamps,
      cases,
    };
  };

  const resultChartData = dataCharts(vaccine);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
        },
      },
    },
    scales: {
      yAxes: {
        ticks: {
          color: "#ffffff",
        },
      },
      xAxes: {
        ticks: {
          color: "#ffffff",
        },
      },
    },
  };

  const data = {
    labels: resultChartData.timestamps,
    datasets: [
      {
        label: "Vaksinasi",
        data: resultChartData.cases,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        fill: true,
        scaleFontColor: "#FFFFFF",
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <ThreeDots fill="#606060" />
      </div>
    );
  }

  return (
    <div className="border border-[#404040] mt-4 px-4 py-3 md:px-10 md:py-5 rounded-xl">
      <h1 className="text-2xl mb-2">Vaksinasi</h1>
      <Filter days={days} day={day} setDay={setDay} />
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartVaccine;
