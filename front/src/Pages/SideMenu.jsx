import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

export const SideMenu = () => {
  const [side_menu_state, set_side_menu_state] = useState("initial");
  const navigator = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigator("/");
  };

  return (
    <div className="side-menu-container">
      {side_menu_state == "opened" ? (
        <>
          <div
            onClick={() => set_side_menu_state("closed")}
            className="open-sidemenu-btn-menu-open general-btn"
          >
            <span class="material-icons">arrow_back</span>
          </div>
          <div className="side-menu-appearing">
            <Link
              onClick={() => set_is_menu_visible(false)}
              to="/expensesoverview"
              className="side-menu-item"
            >
              Expenses Overview
            </Link>
            <Link
              onClick={() => set_is_menu_visible(false)}
              to="/budgetoverview"
              className="side-menu-item"
            >
              Budget Overview
            </Link>
            <Link
              onClick={() => set_is_menu_visible(false)}
              to="/myprofile"
              className="side-menu-item"
            >
              My Profile
            </Link>
            <div onClick={handleLogOut} className="side-menu-item">
              Log Out
            </div>
          </div>
        </>
      ) : side_menu_state == "closed" ? (
        <>
          <div
            onClick={() => set_side_menu_state("opened")}
            className="open-sidemenu-btn general-btn"
          >
            <span class="material-icons">arrow_right_alt</span>
          </div>
          <div className="side-menu-disappearing">
            <Link className="side-menu-item">Expenses Overview</Link>
            <Link className="side-menu-item">Budget Overview</Link>
            <Link className="side-menu-item">My Profile</Link>
            <Link className="side-menu-item">Log Out</Link>
          </div>
        </>
      ) : (
        <>
          <div
            onClick={() => set_side_menu_state("opened")}
            className="sidemenu-btn-inital general-btn"
          >
            <span class="material-icons">arrow_right_alt</span>
          </div>
          {/* <div className="side-menu-disappearing">
            <Link className="side-menu-item">Expenses Overview</Link>
            <Link className="side-menu-item">Budget Overview</Link>
            <Link className="side-menu-item">My Profile</Link>
            <Link className="side-menu-item">Log Out</Link>
          </div> */}
        </>
      )}
    </div>
  );
};
