import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { App } from "./App";
import { SERVICE_PORT, SERVICE_URL } from "./util/constants";

configure({ adapter: new Adapter() });
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
