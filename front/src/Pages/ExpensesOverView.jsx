import React, { useState } from "react";
import AddExpense from "../ui/expenses/AddExpense";
import ExpensesContainer from "../ui/expenses/ExpensesContainer";

const ExpensesOverView = () => {
  const [add_expense_popup_visibilty, set_add_expense_popup_visibilty] =
    useState(false);
  const [update_expenses, set_update_expenses] = useState(false);

  return (
    <div className="genearl-card-container expense_overview_container">
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
    </div>
  );
};

export default ExpensesOverView;
