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
import { ALL, FARM_IDS, FIELD_KEYS, SENSOR_TYPES } from "./util/constants";
import { getDate } from "./util/dateParser";
import { Chart } from "./Chart";
import { datesort } from "./util/sorter";

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
  const [selectedFarm, setSelectedFarm] = useState(ALL);
  const [chartTable, setChartTable] = useState({ measurements: [] });
  const [rows, setRowData] = useState([]);

  useEffect(async () => {
    const names = await fetchFarmNames();
    if (names.error) return;
    setFarmNames(names);
  }, []);

  const columns = [
    {
      field: FIELD_KEYS.LOCATION,
      headerName: "Location",
      minWidth: 200,
      flex: maxColWidth,
    },
    {
      field: FIELD_KEYS.DATETIME,
      headerName: "Time of measurement",
      minWidth: 200,
      sortComparator: datesort,
      flex: maxColWidth,
    },
    {
      field: FIELD_KEYS.SENSOR_TYPE,
      headerName: "Type",
      minWidth: 150,
      flex: maxColWidth,
      description:
        "The type of measurement taken. Possible values are rainfall, pH or temperature.",
      sortable: false,
    },
    {
      field: FIELD_KEYS.VALUE,
      headerName: "Value",
      minWidth: 150,
      flex: maxColWidth,
    },
  ];

  const handleButtonClick = async ({ target }) => {
    const targetFarm = FARM_IDS[target.textContent];

    if (targetFarm) {
      setSelectedFarm(target.textContent);
      await getFarmStats(targetFarm).then((data) => generateRows(data));
    } else {
      setSelectedFarm(ALL);
      await getStatsForAll().then((data) => generateRows(data));
    }
  };

  const generateRows = async ({ measurements }) => {
    const rowData = measurements.map((row, idx) => ({
      ...row,
      id: idx,
      datetime: getDate(row.datetime),
      datetime_raw: row.datetime,
    }));
    setChartTable({ measurements: rowData });
    setRowData([...rowData]);
  };

  return (
    <>
      <Toolbar farms={farmNames} onButtonClick={handleButtonClick} />
      {rows.length > 0 ? (
        <Chart
          data={chartTable}
          sensorType={SENSOR_TYPES.TEMPERATURE}
          selectedFarm={selectedFarm}
        />
      ) : (
        <Chart data={chartTable} />
      )}
      <div className="data-grid">
        <DataGrid columns={columns} rows={rows} />
      </div>
    </>
  );
};

App.propTypes = {
  serviceUrl: PropTypes.string.isRequired,
  port: PropTypes.number.isRequired,
};
