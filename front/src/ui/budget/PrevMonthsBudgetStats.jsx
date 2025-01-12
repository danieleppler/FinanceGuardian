import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const PrevMonthsBudgetStats = ({ expenses, incomes }) => {
  const options = {
    responsive: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Monthly Budget Balance Overview",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Balance",
        data: labels.map((label) => {
          let total_month_expense = expenses
            .filter((x) => {
              const converted_date = new Date(x.date);
              if (
                label ===
                converted_date.toLocaleString("default", { month: "long" })
              )
                return x;
            })
            .reduce((acc, item) => {
              return (acc += Number(item.amount));
            }, 0);
          let total_month_income = incomes
            .filter((x) => {
              const converted_date = new Date(x.date);
              if (
                label ===
                converted_date.toLocaleString("default", { month: "long" })
              )
                return x;
            })
            .reduce((acc, item) => {
              return (acc += Number(item.amount));
            }, 0);

          if (total_month_income === 0) {
            return Number(total_month_expense);
          }
          return Number(total_month_income - total_month_expense);
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <div className="montly-balance-title">
        Monthly Budget Balance Overview
      </div>
      <div style={{ position: "relative", top: "10%" }}>
        <Bar options={options} data={data} />;
      </div>
    </>
  );
};
