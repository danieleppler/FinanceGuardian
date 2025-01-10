import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./Pages/App.jsx";
import { BrowserRouter } from "react-router";
import AuthProvider from "./Contexts/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
