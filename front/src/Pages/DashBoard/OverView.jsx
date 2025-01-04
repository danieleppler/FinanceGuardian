import React, { useState } from "react";
import AddExpense from "./AddExpense";
import ExpensesContainer from "./ExpensesContainer";
import { SideMenu } from "../SideMenu";

const OverView = () => {
  const [add_expense_popup_visibilty, set_add_expense_popup_visibilty] =
    useState(false);
  const [update_expenses, set_update_expenses] = useState(false);

  return (
    <>
      <SideMenu />
      <ExpensesContainer
        update_expenses={update_expenses}
        set_update_expenses={set_update_expenses}
      />
      <div
        onClick={() => {
          set_add_expense_popup_visibilty(true);
        }}
        className="general-btn add-expense-button"
      >
        + Add Expense
      </div>
      {add_expense_popup_visibilty && (
        <AddExpense
          update_expenses={update_expenses}
          set_update_expenses={set_update_expenses}
          set_add_expense_popup_visibilty={set_add_expense_popup_visibilty}
        />
      )}
    </>
  );
};

export default OverView;
