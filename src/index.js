import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { Normalize } from "styled-normalize";
import { AuthProvider } from "./contexts/AuthContexts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Normalize />
    <AuthProvider>
      <Router />
    </AuthProvider>
  </>
);
