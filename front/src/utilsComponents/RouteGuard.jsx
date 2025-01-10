import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../Contexts/AuthContext";
import axios from "axios";
import { SideMenu } from "../Pages/SideMenu";
const RouteGuard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const check_token = async () => {
      if (user) {
        await axios
          .post(`${process.env.VITE_SERVER_URL}/auth/check_token`, {
            entry_token: user.token,
          })
          .catch((rej) => {
            if (rej.status === 401) navigate("/");
          });
      }
    };
    check_token();
  }, [user]);

  return (
    //check if user is authenticated . option is to get token + user from redux store, or by context
    //if there is a couple of states we need to push down the components, its better to use redux

    <>
      <SideMenu />
      {<Outlet />}
    </>
  );
};

export default RouteGuard;
