import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { Normalize } from "styled-normalize";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Normalize />
    <Router />
  </>
);
