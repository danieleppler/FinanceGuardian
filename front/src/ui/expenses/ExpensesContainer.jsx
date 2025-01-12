import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import ExpensesList from "./ExpensesList";
import axios from "axios";
import Filter from "./Filter";

var base_expenses = [];

const ExpensesContainer = ({ update_expenses, set_update_expenses }) => {
  const { user } = useAuth();
  const [expenses, set_expenses] = useState([]);

  let sub_total = 0;

  if (expenses.length > 0) {
    sub_total = expenses.reduce((acc, x) => {
      return (acc += Number(x.amount));
    }, 0);
  }

  useEffect(() => {
    const fetchData = async () => {
      const respons = await axios.get(
        `${process.env.VITE_SERVER_URL}/expenses/${user.id}`
      );
      if (respons.status === 200) {
        const temp = respons.data.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });
        set_expenses(temp);
        base_expenses = temp;
      }
    };
    if (user) fetchData();
  }, [user, update_expenses]);

  return (
    <>
      {base_expenses && (
        <div className="expense-o-b">
          <Filter
            base_data={base_expenses}
            data={expenses}
            set_data={set_expenses}
          />
        </div>
      )}
      <div className="expense-o-a">
        <ExpensesList
          set_update_expenses={set_update_expenses}
          update_expenses={update_expenses}
          expenses={expenses}
        />
      </div>
      <div className="expense-o-c">
        <div className="e_row_text expense_row subtotal_amount ">
          <div style={{ float: "left" }}>SubTotal :</div>
          <div className="e_amount" style={{ float: "right" }}>
            {sub_total}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpensesContainer;
