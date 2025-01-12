import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const MonthExpensesTimeLine = ({ month_expenses }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Expenses Timeline",
      },
    },
  };

  const labels = ["1", "5", "10", "15", "20", "25", "30"];

  const data = {
    labels,
    datasets: [
      {
        label: "expense",
        data: labels.map((label, index) => {
          return month_expenses
            .filter((x) => {
              const converted_date = new Date(x.date);

              if (index === 0 && converted_date.getDay() <= Number(label))
                return x;
              if (
                converted_date.getDay() <= Number(label) &&
                converted_date.getDay() >= Number(labels[index - 1])
              )
                return x;
            })
            .reduce((acc, item) => {
              return (acc += Number(item.amount));
            }, 0);
        }),
        backgroundColor: "red",
      },
    ],
  };

  return <Line options={options} data={data} />;
};
