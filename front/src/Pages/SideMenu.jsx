import React, { useState } from "react";
import { Link } from "react-router";

export const SideMenu = () => {
  const [is_menu_visible, set_is_menu_visible] = useState(false);

  return (
    <div>
      <div
        onClick={() => set_is_menu_visible(!is_menu_visible)}
        className="open-sidemenu-btn general-btn"
      >
        {is_menu_visible ? (
          <span class="material-icons">arrow_right_alt</span>
        ) : (
          <span class="material-icons">arrow_back</span>
        )}
      </div>
      {is_menu_visible && (
        <div className="side-menu">
          <Link className="side-menu-item">Expenses Overview</Link>
          <Link className="side-menu-item">Budget Overview</Link>
          <Link className="side-menu-item">My Profile</Link>
          <Link className="side-menu-item">Log Out</Link>
        </div>
      )}
    </div>
  );
};
