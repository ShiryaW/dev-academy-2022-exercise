import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { App } from "./App";

configure({ adapter: new Adapter() });
const createApp = (props) => shallow(<App {...props} />);

describe("App", () => {
  it("renders the grid component", () => {
    const app = createApp({});

    expect(app).toMatchSnapshot();
  });
});
