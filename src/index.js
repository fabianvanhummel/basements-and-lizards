import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.css";

document.getElementById('root').style.height = "100%"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
