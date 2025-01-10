import React from "react";

export const IncomesWindow = ({ incomes }) => {
  return (
    <div className=" budget-overview-grid-item-b ">
      <div style={{ color: "white" }}>Incomes:</div>
      <div className="budget-window">
        {incomes.map((x) => {
          return (
            <div>
              {x.title} <span className="e_amount">{x.amount}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
