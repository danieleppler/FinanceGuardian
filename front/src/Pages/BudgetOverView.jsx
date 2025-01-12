import React, { useEffect, useState } from "react";
import AddIncome from "../ui/budget/AddIncome";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router";
import { IncomesStats } from "../ui/budget/IncomesStats";
import { IncomesWindow } from "../ui/budget/IncomesWindow";
import { FixedExpensesTable } from "../ui/budget/FixedExpensesTable";
import { PrevMonthsBudgetStats } from "../ui/budget/PrevMonthsBudgetStats";
import { MonthExpensesTimeLine } from "../ui/budget/MonthExpensesTimeLine";

export const BudgetOverView = () => {
  const [add_income_popup_visibilty, set_add_income_popup_visibilty] =
    useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const [incomes, set_incomes] = useState([]);
  const [expenses, set_expenses] = useState([]);
  const [totalexpenses, set_totalexpenses] = useState([]);

  useEffect(() => {
    const fetch_data = async () => {
      const response_incomes = axios.get(
        `${process.env.VITE_SERVER_URL}/income/fixed/${user?.id}`
      );

      const response_expenses = axios.get(
        `${process.env.VITE_SERVER_URL}/expenses/fixed/${user?.id}`
      );

      const response_total_expenses = axios.get(
        `${process.env.VITE_SERVER_URL}/expenses/${user?.id}`
      );

      Promise.all([
        response_incomes,
        response_expenses,
        response_total_expenses,
      ])
        .then((respones) => {
          set_incomes(respones[0].data);
          set_expenses(respones[1].data);
          set_totalexpenses(respones[2].data);
        })
        .catch((err) => {
          alert(err.message);
          navigate("/error");
        });
    };
    if (user) fetch_data();
  }, [user]);

  const handle_income_delete = async (income) => {
    const response = await axios
      .delete(`${process.env.VITE_SERVER_URL}/income/${income.id}`)
      .catch(() => {
        navigate("/error");
      });

    if (response.status === 200)
      set_incomes(incomes.filter((x) => x.id !== income.id));
  };

  return (
    <>
      <div className="budget-overview-container genearl-card-container">
        <div className="budget-o-a">
          <div className="add-income-a">
            <div className="add-income-title">Add income</div>
            <div className="add-income-description">
              {" "}
              Please Enter your expected monthly incomes so we will calculate
              your budget
            </div>
          </div>
          <div className="add-income-b">
            <div>
              <div className="current-incomes-title">Current incomes : </div>
              <div className="incomes-table">
                <IncomesWindow
                  handle_delete={handle_income_delete}
                  incomes={incomes}
                />
              </div>
            </div>
            <div className="add-income-btn-container">
              <button
                onClick={() => set_add_income_popup_visibilty(true)}
                className="general-btn add-income-btn"
              >
                Add Income
              </button>
            </div>
          </div>
          <div className="add-income-c">
            <IncomesStats incomes={incomes} />
          </div>
        </div>
        <div className="budget-o-b">
          <MonthExpensesTimeLine month_expenses={totalexpenses} />
        </div>
        <div className="budget-o-e"></div>
        <div className="budget-o-c">
          <FixedExpensesTable expenses={expenses} incomes={incomes} />
        </div>
        <div className="budget-o-d">
          <PrevMonthsBudgetStats expenses={expenses} incomes={incomes} />
        </div>
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
