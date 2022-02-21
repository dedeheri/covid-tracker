import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistory, getHistoryByCountries } from "../redux/action/getHistory";

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
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartRecovered = ({ countrie }) => {
  const [day, setDay] = useState(7);

  const days = {
    "7 Hari": 7,
    "1 Bulan": 30,
    "6 Bulan": 182,
    Total: "all",
  };

  const { history, loading } = useSelector((state) => state.history);
  const dispatch = useDispatch();

  useEffect(() => {
    if (countrie.countrieName === "Seluruh Dunia") {
      dispatch(getHistory(day.v || 7));
    } else {
      dispatch(getHistoryByCountries(day.v || 7, countrie.countrieInfo.iso2));
    }
  }, [day, countrie]);

  const dataCharts = (history) => {
    const timestamps = [];
    const recovered = [];

    for (let [k] of Object.entries(history?.recovered || "")) {
      let options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      timestamps.push(new Date(k).toLocaleDateString("in-IN", options));
    }
    for (let [k, v] of Object.entries(history?.recovered || "")) {
      recovered.push(v);
    }

    return {
      timestamps,
      recovered,
    };
  };

  const resultChartData = dataCharts(history);

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
        label: "Sembuh",
        data: resultChartData.recovered,
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
    <div className="border mt-6 border-[#404040] px-4 py-3 md:px-10 md:py-5 rounded-xl">
      <h1 className="text-2xl mb-2">Sembuh</h1>
      <Filter days={days} day={day} setDay={setDay} />
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartRecovered;
