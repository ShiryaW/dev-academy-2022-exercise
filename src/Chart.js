import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { VegaLite } from "react-vega";
import { ALL, FIELD_KEYS } from "./util/constants";

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

const specBase = {
  width: 1000,
  height: 300,
  data: { name: "measurements" },
  mark: "area",
  autosize: {
    resize: true,
  },
  encoding: {
    x: { field: FIELD_KEYS.DATETIME_RAW, type: "temporal", title: "Time" },
    y: { field: FIELD_KEYS.VALUE, type: "quantitative", title: "Temperature" },
  },
};

const specAllTypesAndFarms = {
  ...specBase,
  encoding: {
    ...specBase.encoding,
    color: { field: FIELD_KEYS.SENSOR_TYPE, type: "nominal", title: "Type" },
  },
};

export const Chart = ({ data, sensorType, selectedFarm }) => {
  const [spec, setSpec] = useState(specAllTypesAndFarms);

  useEffect(() => {
    getSpec(data.measurements, sensorType, selectedFarm);
  }, [data]);

  const getTypeFilter = (sensorType) => {
    return {
      transform: [
        {
          filter: {
            field: FIELD_KEYS.SENSOR_TYPE,
            equal: sensorType,
          },
        },
      ],
    };
  };

  const getSpec = (data, sensorType, selectedFarm) => {
    let spec = {
      ...specBase,
      ...getTypeFilter(sensorType),
    };

    if (selectedFarm === ALL) {
      spec.encoding = {
        ...specBase.encoding,
        color: {
          field: FIELD_KEYS.LOCATION,
          type: "nominal",
          title: "Location",
        },
      };
    }

    setSpec(spec);
  };

  return (
    <div id="chart">
      <VegaLite spec={spec} data={{ measurements: data.measurements }} />
    </div>
  );
};

Chart.propTypes = {
  data: PropTypes.object,
  sensorType: PropTypes.string,
  selectedFarm: PropTypes.string,
};
