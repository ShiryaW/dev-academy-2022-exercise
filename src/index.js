import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { SERVICE_PORT, SERVICE_URL } from "./util/constants";

const serviceUrl = process.env.SERVICEURL || SERVICE_URL;
const port = process.env.PORT || SERVICE_PORT;

ReactDOM.render(
  <React.StrictMode>
    <App serviceUrl={serviceUrl} port={port} />
  </React.StrictMode>,
  document.getElementById("root")
);
