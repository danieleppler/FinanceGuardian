import React, { useState } from "react";
import { BudgetCategoryDetails } from "./BudgetCategoryDetails";

export const FixedExpensesTable = ({ expenses, incomes }) => {
  const [show_catagory_details, set_show_catagory_details] = useState("");

  let grouped_by_expenses = [];
  let total_incomes = 0;
  let total_expenses = 0;

  if (incomes.length > 0) {
    total_incomes = incomes.reduce((acc, curr) => {
      return (acc += Number(curr.amount));
    }, 0);
  }

  if (expenses.length > 0) {
    total_expenses = expenses.reduce((acc, curr) => {
      return (acc += Number(curr.amount));
    }, 0);
    grouped_by_expenses = Object.groupBy(expenses, ({ type }) => type);
  }

  return (
    <table border={1}>
      <thead>
        <td>Expenses Catagory</td>
        <td>Amount</td>
      </thead>
      <tbody>
        {Object.entries(grouped_by_expenses)?.map((x) => {
          return (
            <tr
              className="expense"
              onMouseOver={() => {
                set_show_catagory_details(x[0]);
              }}
              onMouseLeave={() => {
                set_show_catagory_details("");
              }}
            >
              <td>{x[0].toLocaleUpperCase()}</td>
              <td className="e_amount">
                {x[1].reduce((acc, item) => {
                  return (acc += Number(item.amount));
                }, 0)}
              </td>
              {show_catagory_details === x[0] && (
                <BudgetCategoryDetails expenses={x[1]} />
              )}
            </tr>
          );
        })}
        <tr className="income">
          <td>INCOMES</td>
          <td className="e_amount">{total_incomes}</td>
        </tr>
        <tr
          className={
            Number(total_incomes - total_expenses) > 0
              ? "free-budget_plus"
              : "free-budget_minus"
          }
        >
          <td>FREE MONTHLY BUDGET</td>
          <td className="e_amount">{total_incomes - total_expenses}</td>
        </tr>
      </tbody>
    </table>
  );
};
