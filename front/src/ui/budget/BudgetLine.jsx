import React, { useState } from "react";
import { BudgetCategoryDetails } from "./BudgetCategoryDetails";

export const BudgetLine = ({ incomes, expenses }) => {
  const [show_catagory_details, set_show_catagory_details] = useState("");

  let total_incomes = 0;
  let total_expenses = 0;
  let grouped_by_expenses = [];

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
    <div className="budget-line">
      {Object.entries(grouped_by_expenses).map((x) => {
        return (
          <div
            onMouseOver={() => {
              set_show_catagory_details(x[0]);
            }}
            onMouseLeave={() => {
              set_show_catagory_details("");
            }}
            className="budget-component budget-component-expense"
          >
            <span>{x[0]} :</span>
            <span className="e_amount">
              {" "}
              {x[1].reduce((acc, item) => {
                return (acc += Number(item.amount));
              }, 0)}
            </span>
            {show_catagory_details === x[0] && (
              <BudgetCategoryDetails expenses={x[1]} />
            )}
          </div>
        );
      })}
      <div className="budget-component budget-component-total">
        {" "}
        Dynamic Budget Left :{" "}
        <span className="e_amount">{total_incomes - total_expenses} </span>
      </div>
    </div>
  );
};
