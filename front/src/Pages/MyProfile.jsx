import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const MyProfile = () => {
  const [update_password, set_update_password] = useState(false);
  const [update_details, set_update_details] = useState(false);
  const [current_user, set_current_user] = useState();

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const response = await axios
          .get(`${process.env.VITE_SERVER_URL}/user/${user.username}`)
          .catch(() => {
            navigate("/error");
          });
        set_current_user(response.data[0]);
      }
    };

    fetchData();
  }, [user]);

  const handle_submit = async (e) => {
    e.preventDefault();
    const f_data = new FormData(e.target);
    if (update_password) {
      if (f_data.get("password") !== f_data.get("confirm_password")) {
        const elem = document.getElementById("password");
        const err_elem = document.getElementById("password_err");
        err_elem.innerHTML = "password dont match";
        elem.classList += "error_field";
        return;
      }
    }

    const new_user = {
      id: user.id,
      first_name: f_data.get("first_name"),
      last_name: f_data.get("last_name"),
      age: f_data.get("age"),
      username: user.username,
      password: f_data.get("password"),
    };

    await axios
      .put(`${process.env.VITE_SERVER_URL}/user/${user.id}`, new_user)
      .catch(() => {
        navigate("/error");
      });

    set_current_user(new_user);
    set_update_details(false);
    alert("user updated !");
  };

  return (
    <div className="genearl-card-container basic-form">
      <form onSubmit={handle_submit}>
        First Name :{" "}
        <input
          name="first_name"
          disabled={update_details ? false : true}
          defaultValue={current_user?.first_name}
        />
        Last Name :{" "}
        <input
          name="last_name"
          disabled={update_details ? false : true}
          defaultValue={current_user?.last_name}
        />
        Age :{" "}
        <input
          name="age"
          disabled={update_details ? false : true}
          type="number"
          defaultValue={current_user?.age}
        />
        {update_details && (
          <button
            type="button"
            className="general-btn"
            onClick={() => {
              if (user && user.username === "TestUser")
                alert(
                  "This is a test user and its password can not be changed"
                );
              else set_update_password(true);
            }}
          >
            Wants to update password ?{" "}
          </button>
        )}
        {update_password && (
          <div>
            Old password :{" "}
            <input
              name="old_password"
              id="old_password"
              required
              type="password"
            />{" "}
            <br />
            New password :{" "}
            <input
              id="password"
              name="password"
              required
              type="password"
            />{" "}
            <span id="password_err"></span>
            <br />
            Confirm password :{" "}
            <input
              id="confirm_password"
              name="confirm_password"
              required
              type="password"
            />{" "}
            <br />
            <button
              className="general-btn"
              onClick={() => set_update_password(false)}
            >
              Cancel
            </button>
          </div>
        )}
        {!update_details && (
          <button
            className="general-btn"
            onClick={() => set_update_details(true)}
          >
            Update details
          </button>
        )}
        {update_details && (
          <button type="submit" className="general-btn">
            Update
          </button>
        )}
      </form>
    </div>
  );
};
