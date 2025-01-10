import axios from "axios";
import React from "react";

import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { icons } from "../../icons";

const AddExpense = ({
  update_expenses,
  set_update_expenses,
  set_add_expense_popup_visibilty,
  expense_data,
}) => {
  const { user } = useAuth();
  const navigator = useNavigate();

  const handle_submit = async (e) => {
    e.preventDefault();
    const f_data = new FormData(e.target);
    let response = {};
    if (!expense_data) {
      response = await axios.post(`${process.env.VITE_SERVER_URL}/expenses`, {
        type: f_data.get("e_type"),
        title: f_data.get("e_title"),
        date: f_data.get("e_date"),
        amount: f_data.get("e_amount"),
        fixed: f_data.get("e_reoccurance_flag") ? true : false,
        user_id: user.id,
      });
    } else {
      response = await axios
        .put(`${process.env.VITE_SERVER_URL}/expenses/${expense_data.id}`, {
          id: expense_data.id,
          type: f_data.get("e_type"),
          title: f_data.get("e_title"),
          date: f_data.get("e_date"),
          amount: f_data.get("e_amount"),
          fixed: f_data.get("e_reoccurance_flag") ? true : false,
          user_id: user.id,
        })
        .catch(() => {
          navigator("/error");
        });
    }

    if (response.status === 201 || 200) {
      set_update_expenses(!update_expenses);
      set_add_expense_popup_visibilty(false);
    }
  };

  return (
    <div className="add_expense_popup_container">
      <form onSubmit={handle_submit}>
        <div className="add_expense_input_grp_a">
          Expense type
          <div className="expense_types_list">
            {icons.map((x, index) => {
              return (
                <>
                  <input
                    type="radio"
                    name="e_type"
                    defaultChecked={
                      expense_data && expense_data.type === x.label
                        ? true
                        : false
                    }
                    value={x.label}
                  />
                  <span
                    key={index}
                    title={x.label}
                    className="expense_type_icon_bg material-icons"
                  >
                    {x.name}
                  </span>
                </>
              );
            })}
          </div>
        </div>
        <div className="add_expense_input_grp_b">
          Expense title :{" "}
          <input
            defaultValue={expense_data ? expense_data.title : ""}
            required
            type="text"
            name="e_title"
          ></input>{" "}
          <br /> <br />
          Expense date :{" "}
          <input
            defaultValue={
              expense_data
                ? new Date(expense_data.date).toLocaleDateString("en-CA")
                : ""
            }
            required
            type="date"
            name="e_date"
          ></input>
        </div>
        <div className="add_expense_input_grp_c">
          <span className="e_amount">
            Expense amount :
            <input
              style={{ width: "20%" }}
              defaultValue={expense_data ? expense_data.amount : ""}
              min="0"
              required
              type="number"
              name="e_amount"
            />
          </span>{" "}
          <br /> <br />
          <div>
            check if this is a re-occurring expense{" "}
            <input
              defaultChecked={expense_data ? expense_data.fixed : false}
              name="e_reoccurance_flag"
              type="checkbox"
            ></input>
            <span
              title="re-occuring expenses is later on will be calculted in the total expense forecast each month"
              className="material-icons"
            >
              {"help_outline"}
            </span>
          </div>
        </div>
        <div className="add_expense_input_grp_d">
          <button className="general-btn" type="submit">
            {" "}
            {expense_data ? <span>update</span> : <span>add</span>}
          </button>
          <button
            className="general-btn"
            onClick={() => {
              set_add_expense_popup_visibilty(false);
            }}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
