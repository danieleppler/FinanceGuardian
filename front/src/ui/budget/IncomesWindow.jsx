import React, { useState } from "react";
import { ConfirmationWindow } from "../popups/ConfirmationWindow";

export const IncomesWindow = ({ incomes, handle_delete }) => {
  const [popup_visible, set_popup_visible] = useState(false);
  const [income_to_delete, set_income_to_delete] = useState("");

  return (
    <>
      <table border={1}>
        <thead>
          <td>title</td>
          <td>amount</td>
          <td>income day</td>
          <td></td>
        </thead>
        <tbody>
          {incomes.length > 0 &&
            incomes.map((x) => {
              return (
                <tr>
                  <td>{x.title}</td>
                  <td className="e_amount">{x.amount}</td>
                  <td>{new Date(x.date).getDay()}</td>
                  <td>
                    <span
                      onClick={() => {
                        set_popup_visible(true);
                        set_income_to_delete(x);
                      }}
                      class="delete-income-btn material-icons"
                    >
                      close
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {popup_visible && (
        <ConfirmationWindow
          confirmation_callback={() => {
            set_popup_visible(false);
            set_income_to_delete("");
            handle_delete(income_to_delete);
          }}
          cancelation_callback={() => {
            set_popup_visible(false);
            set_income_to_delete("");
          }}
        />
      )}
    </>
  );
};
