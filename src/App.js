import "./App.css";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

/* NOTES TO SELF:
  What kind of questions can we answer?
  1) Is there a correlation between rainfall/pH/temperature on a given farm?
  2) Which farm gets the most rainfall/has the highest pH/highest temperature?
  3) How has the value of X progressed over time on a given farm?
  4) What are the average values of X on each farm?
 */

export const App = () => {
  const maxColWidth = 400;
  const columns = [
    {
      field: "location",
      headerName: "Location",
      minWidth: 200,
      flex: maxColWidth,
    },
    {
      field: "datetime",
      headerName: "Time of measurement",
      minWidth: 200,
      flex: maxColWidth,
    },
    {
      field: "sensorType",
      headerName: "Type",
      minWidth: 150,
      flex: maxColWidth,
      description:
        "The type of measurement taken. Possible values are rainfall, pH or temperature.",
      sortable: false,
    },
    { field: "value", headerName: "Value", minWidth: 150, flex: maxColWidth },
  ];

  // dummy rows for now
  const rows = [
    {
      id: 1,
      location: "Nooras farm",
      datetime: new Date("2018-12-31T22:00:00.000Z"),
      sensorType: "pH",
      value: "5.88",
    },
    {
      id: 2,
      location: "PartialTech Research Farm",
      datetime: new Date("2018-12-31T22:00:00.000Z"),
      sensorType: "pH",
      value: "5.90",
    },
    {
      id: 3,
      location: "Organic Ossi's Impact That Lasts",
      datetime: new Date("2018-12-31T22:00:00.000Z"),
      sensorType: "pH",
      value: "7.17",
    },
  ];

  return (
    <div className="data-grid">
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
};
