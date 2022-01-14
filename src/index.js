import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";

const serviceUrl = process.env.SERVICEURL || "http://localhost";
const port = process.env.PORT || 8080;

ReactDOM.render(
  <React.StrictMode>
    <App serviceUrl={serviceUrl} port={port} />
  </React.StrictMode>,
  document.getElementById("root")
);
