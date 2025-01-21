import React, { useState } from "react";
import { mock_users } from "../mock_data";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../Contexts/AuthContext";

const Login = () => {
  const server_url = process.env.VITE_SERVER_URL;

  const [form_errors, set_form_errors] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { set_user } = useAuth();

  const handle_submit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const f_username = form.get("username");
    const f_password = form.get("password");

    if (!f_username) {
      set_form_errors({ password: "", username: `please fill username field` });
      return;
    }

    if (!f_password) {
      set_form_errors({ password: "please fill password field", username: `` });
      return;
    }

    const response = await axios
      .post(`${server_url}/auth/login`, { f_username, f_password })
      .catch((rej) => {
        if (rej.status === 401)
          if (rej.response.data.err_type === "password")
            set_form_errors({ password: rej.response.data.err, username: `` });
          else
            set_form_errors({ password: "", username: rej.response.data.err });
      });

    set_user({
      token: response.data.entry_token,
      username: f_username,
      id: response.data.id,
    });
    navigate("/expensesoverview");
  };

  return (
    <div className="genearl-card-container basic-form">
      <form onSubmit={handle_submit}>
        UserName <input type="text" name="username"></input>
        {form_errors.username && (
          <p className="form_error">{form_errors.username}</p>
        )}
        Password <input type="password" name="password"></input>
        {form_errors.password && (
          <p className="form_error">{form_errors.password}</p>
        )}
        <button type="submit" className="general-btn">
          Login
        </button>
        <p>
          Dont have an account ? <a href="/register">register</a> <br />
          Here to be impressed from the website ? Please use this user{" "}
          <span
            title="username : TestUser  password: Tt123456"
            className="material-symbols-outlined predefined-user-icons"
          >
            person
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
