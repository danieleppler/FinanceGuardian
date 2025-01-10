import React from "react";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main CSS file
import "react-date-range/dist/theme/default.css"; // Theme CSS file

export const DateRangePicker = ({ set_visibilty, state, setState }) => {
  const [clicks_num, set_clicks_num] = useState(0);

  const handleChange = (item) => {
    if (clicks_num === 0) {
      setState([item.selection]);
      set_clicks_num(1);
    } else {
      setState([{ ...item.selection, active_select: true }]);
      set_visibilty(false);
    }
  };

  return (
    <>
      <DateRange
        className="filter-expense-date-picker"
        editableDateInputs={false}
        onChange={(item) => handleChange(item)}
        moveRangeOnFirstSelection={false}
        ranges={state}
        showDateDisplay={false}
      />
    </>
  );
};
