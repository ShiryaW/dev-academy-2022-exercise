import "./App.css";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Toolbar } from "./Toolbar.js";
import {
  fetchFarmNames,
  getFarmStats,
  getStatsForAll,
} from "./util/dataFetcher";
import { FARM_IDS } from "./util/constants";
import { getDate } from "./util/dateParser";

/* NOTES TO SELF:
  What kind of questions can we answer?
  1) Is there a correlation between rainfall/pH/temperature on a given farm?
  2) Which farm gets the most rainfall/has the highest pH/highest temperature?
  3) How has the value of X progressed over time on a given farm?
  4) What are the average values of X on each farm?
 */

export const App = () => {
  const maxColWidth = 400;
  const [farmNames, setFarmNames] = useState([]);
  const [rows, setRowData] = useState([]);

  useEffect(async () => {
    const names = await fetchFarmNames();
    if (names.error) return;
    setFarmNames(names);
  }, []);

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
      field: "sensor_type",
      headerName: "Type",
      minWidth: 150,
      flex: maxColWidth,
      description:
        "The type of measurement taken. Possible values are rainfall, pH or temperature.",
      sortable: false,
    },
    { field: "value", headerName: "Value", minWidth: 150, flex: maxColWidth },
  ];

  const handleButtonClick = async ({ target }) => {
    const targetFarm = FARM_IDS[target.textContent];

    if (targetFarm) {
      await getFarmStats(targetFarm).then((data) => generateRows(data));
    } else {
      await getStatsForAll().then((data) => generateRows(data));
    }
  };

  const generateRows = async ({ measurements }) => {
    const rowData = measurements.map((row, idx) => ({
      ...row,
      id: idx,
      datetime: getDate(row.datetime),
    }));
    setRowData(rowData);
  };

  return (
    <div className="data-grid">
      <Toolbar farms={farmNames} onButtonClick={handleButtonClick} />
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
};

App.propTypes = {
  serviceUrl: PropTypes.string.isRequired,
  port: PropTypes.number.isRequired,
};
