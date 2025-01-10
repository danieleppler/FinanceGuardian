import axios from "axios";
import React from "react";

import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { income_icons } from "../../icons";

//all items in this component use add expense existing css classes for styling

const AddIncome = ({
  set_update_incomes,
  set_add_income_popup_visibilty,
  income_data,
}) => {
  const { user } = useAuth();
  const navigator = useNavigate();

  const handle_submit = async (e) => {
    e.preventDefault();
    const f_data = new FormData(e.target);
    let response = {};
    if (!income_data) {
      response = await axios.post(`${process.env.VITE_SERVER_URL}/income`, {
        type: f_data.get("i_type"),
        title: f_data.get("i_title"),
        date: f_data.get("i_date"),
        amount: f_data.get("i_amount"),
        fixed: true,
        user_id: user.id,
      });
    } else {
      response = await axios
        .put(`${process.env.VITE_SERVER_URL}/expenses/${income_data.id}`, {
          id: income_data.id,
          type: f_data.get("i_type"),
          title: f_data.get("i_title"),
          date: f_data.get("i_date"),
          amount: f_data.get("i_amount"),
          fixed: true,
          user_id: user.id,
        })
        .catch(() => {
          navigator("/error");
        });
    }

    if (response.status === 201 || 200) {
      set_update_incomes(response.data);
      set_add_income_popup_visibilty(false);
    }
  };

  return (
    <div className="add_expense_popup_container">
      <form onSubmit={handle_submit}>
        <div className="add_expense_input_grp_a">
          Income type
          <div className="expensi_types_list">
            {income_icons.map((x, index) => {
              return (
                <>
                  <input
                    type="radio"
                    name="i_type"
                    defaultChecked={
                      income_data && income_data.type === x.label ? true : false
                    }
                    value={x.label}
                  />
                  <span
                    key={index}
                    title={x.label}
                    className="expensi_type_icon_bg material-icons"
                  >
                    {x.name}
                  </span>
                </>
              );
            })}
          </div>
        </div>
        <div className="add_expense_input_grp_b">
          Income title :{" "}
          <input
            defaultValue={income_data ? income_data.title : ""}
            required
            type="text"
            name="i_title"
          ></input>{" "}
          <br /> <br />
          Income date :{" "}
          <input
            defaultValue={
              income_data
                ? new Date(income_data.date).toLocaleDateString("en-CA")
                : ""
            }
            required
            type="date"
            name="i_date"
          ></input>
        </div>
        <div className="add_expense_input_grp_c">
          <span className="i_amount">
            Income amount :
            <input
              style={{ width: "20%" }}
              defaultValue={income_data ? income_data.amount : ""}
              min="0"
              required
              type="number"
              name="i_amount"
            />
          </span>{" "}
        </div>
        <div className="add_expense_input_grp_d">
          <button className="general-btn" type="submit">
            {" "}
            {income_data ? <span>update</span> : <span>add</span>}
          </button>
          <button
            className="general-btn"
            onClick={() => {
              set_add_income_popup_visibilty(false);
            }}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIncome;
