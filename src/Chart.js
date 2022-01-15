import PropTypes from "prop-types";
import React, { useEffect } from "react";
import * as vega from "vega";
import * as vegaLite from "vega-lite";
import * as vl from "vega-lite-api";
import { FIELD_KEYS } from "./util/constants";

const config = {
  style: {
    "guide-label": {
      fontSize: 20,
    },
    "guide-title": {
      fontSize: 30,
    },
  },
};

/* Example data entry:
  {
    datetime: "31.12.2018, 22:00:00",
    datetime_raw: "2018-12-31T22:00:00.000Z",
    farm_id: "2"
    id: 0
    location: "PartialTech Research Farm"
    sensor_type: "ph"
    value: 5.9
   }
 */

export const Chart = ({ data, sensorType }) => {
  const chartRef = React.createRef();

  useEffect(() => {
    vl.register(vega, vegaLite, {
      view: { renderer: "svg" },
    });

    drawChart(filteredData).then((chart) => {
      chartRef.current.appendChild(chart);
    });
  }, []);

  const filterEntriesBySensorType = (type, data) => {
    return data.filter((entry) => entry[FIELD_KEYS.SENSOR_TYPE] === type);
  };

  const filteredData = filterEntriesBySensorType(sensorType, data);

  const drawChart = (data) => {
    return vl
      .markLine()
      .data(data)
      .encode(
        vl.x().fieldT(FIELD_KEYS.DATETIME_RAW).title("Time"),
        vl.y().fieldQ(FIELD_KEYS.VALUE).title("Value")
      )
      .width(800)
      .height(600)
      .autosize({ type: "fit" })
      .config(config)
      .render();
  };

  return React.createElement("div", { ref: chartRef });
};

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  sensorType: PropTypes.string.isRequired,
};
