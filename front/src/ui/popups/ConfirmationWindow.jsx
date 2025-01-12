import React from "react";

export const ConfirmationWindow = ({
  confirmation_callback,
  cancelation_callback,
}) => {
  return (
    <div className="confirmation_popup">
      <div className="confirmation_popup_title">
        Are you sure you want to perform this action ?
      </div>
      <div className="confirmation_popup_btns">
        <button onClick={confirmation_callback}>Yes</button>
        <button onClick={cancelation_callback}>No</button>
      </div>
    </div>
  );
};
