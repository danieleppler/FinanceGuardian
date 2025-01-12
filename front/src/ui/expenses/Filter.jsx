import React, { useEffect, useState } from "react";
import { DateRangePicker } from "../../utilsComponents/DateRangePicker";

const Filter = ({ data, set_data, base_data }) => {
  const [date_range_state, set_date_range_state] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
      active_select: false,
    },
  ]);

  const [is_date_range_visible, set_is_date_range_visible] = useState(false);

  useEffect(() => {
    if (date_range_state[0].active_select) {
      const temp = data.filter((x) => {
        const temp = new Date(Date.parse(x.date));
        return (
          temp >= date_range_state[0].startDate &&
          temp <= date_range_state[0].endDate
        );
      });
      set_data(temp);
    }
  }, [date_range_state]);

  return (
    <div className="filter-expense_list">
      Filter by : <br /> <br />
      <div className="flex-container-col">
        Expense type :{" "}
        <select
          onChange={(e) => {
            const temp = data.filter((x) => {
              return x.type === e.target.value;
            });
            set_data(temp);
          }}
        >
          <option>----</option>
          {base_data
            .filter(
              (obj, index, self) =>
                index === self.findIndex((t) => t.type === obj.type)
            )
            .map((x) => {
              return <option>{x.type}</option>;
            })}
        </select>
        <button
          onClick={() => {
            set_is_date_range_visible(true);
          }}
        >
          Select dates
        </button>{" "}
        {is_date_range_visible && (
          <>
            <DateRangePicker
              set_visibilty={set_is_date_range_visible}
              setState={set_date_range_state}
              state={date_range_state}
            />
          </>
        )}
        <div>
          {date_range_state[0].active_select && (
            <span>
              {" "}
              From : {date_range_state[0].startDate.toLocaleDateString()}
            </span>
          )}
          {date_range_state[0].active_select && (
            <span> To: {date_range_state[0].endDate.toLocaleDateString()}</span>
          )}
        </div>
      </div>
      <button
        className="reset-filter-btn"
        onClick={() => {
          set_data(base_data);
          let temp = { ...date_range_state[0] };
          set_date_range_state([{ ...temp, active_select: false }]);
        }}
      >
        Reset Filter
      </button>
    </div>
  );
};

export default Filter;
