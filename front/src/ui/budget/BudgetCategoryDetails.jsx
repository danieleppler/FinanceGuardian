import React from "react";

export const BudgetCategoryDetails = ({ expenses }) => {
  return (
    <div className="catagory-expenses-details-wnd">
      {expenses.map((x) => {
        return (
          <div>
            {x.title} <span className="e_amount">{x.amount}</span>
          </div>
        );
      })}
    </div>
  );
};
