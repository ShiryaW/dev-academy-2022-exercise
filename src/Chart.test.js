import React from "react";
import { shallow } from "enzyme";
import { Chart } from "./Chart";
import { VegaLite } from "react-vega";
import { ALL, SENSOR_TYPES } from "./util/constants";

const createChart = (props) =>
  shallow(
    <Chart
      {...{
        data: {
          measurements: [],
        },
        selectedFarm: ALL,
        ...props,
      }}
    />
  );

const testData = {
  measurements: [
    {
      location: "Friman Metsola collective",
      datetime: "2018-12-31T22:00:00.000Z",
      value: 6.52,
      farm_id: "1",
      sensor_type: "ph",
    },
    {
      location: "Friman Metsola collective",
      datetime: "2018-12-31T22:00:00.000Z",
      value: 2.6,
      farm_id: "1",
      sensor_type: "rainfall",
    },
    {
      location: "Friman Metsola collective",
      datetime: "2019-01-01T06:09:47.373Z",
      value: -9.0,
      farm_id: "1",
      sensor_type: "temperature",
    },
    {
      location: "Friman Metsola collective",
      datetime: "2019-01-01T21:04:09.813Z",
      value: -12.2,
      farm_id: "1",
      sensor_type: "temperature",
    },
  ],
};

describe("Chart", () => {
  it("renders the chart component empty when no data is supplied", () => {
    const wrapper = createChart();
    const chartInstance = wrapper.find(VegaLite);

    expect(chartInstance.exists()).toBe(true);
    expect(chartInstance.props()).toHaveProperty("data");
    expect(chartInstance.props().data).toHaveProperty("measurements");
    expect(chartInstance.props().data.measurements).toEqual([]);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders the chart component with filtered data for temperature", () => {
    const wrapper = createChart({
      data: testData,
      sensorType: SENSOR_TYPES.TEMPERATURE,
    });
    const chartInstance = wrapper.find(VegaLite);

    expect(chartInstance.props().data.measurements).toEqual(
      testData.measurements
    );
    expect(chartInstance.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
