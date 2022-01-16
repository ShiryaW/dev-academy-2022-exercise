import { Selector } from "testcafe";

export class PageModel {
  constructor() {
    this.root = Selector("#root");
    this.chart = Selector("#chart");
    this.table = new Table();
    this.toolbar = new Toolbar();
  }
}

class Toolbar {
  constructor() {
    this.buttons = {
      all: getButton("ALL"),
      friman: getButton("FRIMAN METSOLA COLLECTIVE"),
      partialtech: getButton("PARTIALTECH RESEARCH FARM"),
      noora: getButton("NOORA'S FARM"),
      ossi: getButton("ORGANIC OSSI'S IMPACT THAT LASTS PLANTATION"),
    };
  }
}

class Table {
  constructor() {
    this.rows = Selector(".MuiDataGrid-row");
    this.menu = Selector(".MuiList-root");
    this.colHeaders = {
      location: getHeader("Location"),
      time: getHeader("Time of measurement"),
      type: getHeader("Type"),
      value: getHeader("Value"),
    };
  }
}

const getButton = (text) => Selector("#toolbar").find("button").withText(text);
const getHeader = (header) =>
  Selector(".data-grid").find(".MuiDataGrid-columnHeader").withText(header);
