import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Toolbar } from "./Toolbar";

configure({ adapter: new Adapter() });
const createToolbar = (props) => shallow(<Toolbar {...props} />);

describe("Toolbar", () => {
  it("renders the toolbar with toggle buttons for each farm", () => {
    const farms = [
      "Friman Metsola",
      "Noora's farm",
      "Organic Ossis's Impact That Lasts",
      "Partial Tech",
    ];
    const toolbar = createToolbar({ farms });

    expect(toolbar).toMatchSnapshot();
  });

  it("renders the toolbar with only the all button if no farm names are supplied", () => {
    const toolbar = createToolbar([]);
    expect(toolbar).toMatchSnapshot();
  });
});
