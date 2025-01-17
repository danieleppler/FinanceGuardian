import React from "react";
import RouteGuard from "./RouteGuard";
import { Route, Routes } from "react-router";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import { GeneralFallBack } from "../Fallbacks/GeneralFallBack";
import ExpensesOverView from "../Pages/ExpensesOverView";
import { BudgetOverView } from "../Pages/BudgetOverView";
import { MyProfile } from "../Pages/MyProfile";

const App_Routes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RouteGuard />}>
          <Route path="/expensesoverview" element={<ExpensesOverView />} />
          <Route path="/budgetoverview" element={<BudgetOverView />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Route>
        <Route path="/error" element={<GeneralFallBack />} />
      </Routes>
    </>
  );
};

export default App_Routes;
