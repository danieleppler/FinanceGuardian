import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

export const IncomesStats = ({ incomes }) => {
  Chart.register(...registerables);

  let data = {};

  if (incomes) {
    let grouped_by_data = Object.groupBy(incomes, ({ type }) => type);
    grouped_by_data = Object.entries(grouped_by_data);

    data = {
      labels: grouped_by_data.map((x) => x[0]),
      datasets: [
        {
          label: "incomes",
          data: grouped_by_data.map((x) => {
            return x[1].reduce((acc, item) => {
              return (acc += Number(item.amount));
            }, 0);
          }),
          backgroundColor: ["blue", "coral"],
        },
      ],
    };
  }

  return (
    <>
      <Pie data={data} />
    </>
  );
};
