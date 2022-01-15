import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Toolbar } from "./Toolbar";

configure({ adapter: new Adapter() });

const noOp = jest.fn();
const createToolbar = (props) =>
  shallow(<Toolbar {...{ ...props, onButtonClick: noOp }} />);

describe("Toolbar", () => {
  it("renders the toolbar with toggle buttons for each farm", () => {
    const farms = [
      { farm_id: 1, name: "Friman Metsola" },
      { farm_id: 2, name: "Noora's farm" },
      { farm_id: 3, name: "Organic Ossis's Impact That Lasts" },
      { farm_id: 4, name: "Partial Tech" },
    ];
    const toolbar = createToolbar({ farms });

    expect(toolbar).toMatchSnapshot();
  });

  it("renders the toolbar with loading text if no farms are supplied (have not loaded yet)", () => {
    const toolbar = createToolbar({ farms: [] });
    expect(toolbar).toMatchSnapshot();
  });
});
