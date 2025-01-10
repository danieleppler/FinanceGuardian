import React, { useEffect, useState } from "react";
import AddIncome from "../ui/budget/AddIncome";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router";
import { BudgetLine } from "../ui/budget/BudgetLine";
import { IncomesWindow } from "../ui/budget/IncomesWindow";

export const BudgetOverView = () => {
  const [add_income_popup_visibilty, set_add_income_popup_visibilty] =
    useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const [incomes, set_incomes] = useState([]);
  const [expenses, set_expenses] = useState([]);

  useEffect(() => {
    const fetch_data = async () => {
      const response_incomes = axios.get(
        `${process.env.VITE_SERVER_URL}/income/fixed/${user?.id}`
      );

      const response_expenses = axios.get(
        `${process.env.VITE_SERVER_URL}/expenses/fixed/${user?.id}`
      );

      Promise.all([response_incomes, response_expenses])
        .then((respones) => {
          set_incomes(respones[0].data);
          set_expenses(respones[1].data);
        })
        .catch((err) => {
          alert(err.message);
          navigate("/error");
        });
    };
    if (user) fetch_data();
  }, [user]);

  return (
    <>
      <div className="budget-overview-gtid-container">
        <div className="budget-overview-grid-item-a ">
          <div>
            Please Enter your expected monthly incomes so we will calculate your
            budget
          </div>
          <div>
            <button
              onClick={() => set_add_income_popup_visibilty(true)}
              className=" general-btn"
            >
              Add Income
            </button>
          </div>
        </div>
        <IncomesWindow incomes={incomes} />
        {incomes.length > 0 && (
          <div className="budget-overview-grid-item-c">
            <BudgetLine incomes={incomes} expenses={expenses} />
          </div>
        )}
      </div>
      {add_income_popup_visibilty && (
        <AddIncome
          set_add_income_popup_visibilty={set_add_income_popup_visibilty}
          set_update_incomes={set_incomes}
        />
      )}
    </>
  );
};
