import React from "react";
import { shallow } from "enzyme";
import { App } from "./App";
import { SERVICE_PORT, SERVICE_URL } from "./util/constants";

const createApp = (props) =>
  shallow(
    <App {...{ ...props, serviceUrl: SERVICE_URL, port: SERVICE_PORT }} />
  );

describe("App", () => {
  it("renders the grid component", () => {
    const app = createApp({});

    expect(app).toMatchSnapshot();
  });
});
