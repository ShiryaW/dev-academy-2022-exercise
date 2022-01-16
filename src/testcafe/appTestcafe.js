import { PageModel } from "./pageModel";
import { Selector } from "testcafe";

fixture("Farm Data Visualizer").page("http://localhost:3000");

const pageModel = new PageModel();
const buttons = pageModel.toolbar.buttons;
const tableMenu = pageModel.table.menu;
const headers = pageModel.table.colHeaders;
const firstRow = pageModel.table.rows.nth(0);

//TODO: tests should not rely on the same table data being in certain rows

test("The table becomes populated on first data fetch", async (t) => {
  await t
    .expect(firstRow.exists)
    .notOk()
    .expect(buttons.all.exists)
    .ok()
    .click(buttons.all)
    .expect(firstRow.exists)
    .ok()
    .expect(firstRow.find(".MuiDataGrid-cell").innerText)
    .eql("Friman Metsola collective");
});

test("Loads data for different farms", async (t) => {
  await t
    .click(buttons.partialtech)
    .expect(firstRow.find(".MuiDataGrid-cell").innerText)
    .eql("PartialTech Research Farm")
    .click(buttons.noora)
    .expect(firstRow.find(".MuiDataGrid-cell").innerText)
    .eql("Noora's farm")
    .click(buttons.ossi)
    .expect(firstRow.find(".MuiDataGrid-cell").innerText)
    .eql("Organic Ossi's Impact That Lasts plantase");
});

test("Sorts rows by date, value, or location", async (t) => {
  // Sorting by value
  await t
    .click(buttons.all)
    .expect(firstRow.find(".MuiDataGrid-cell").nth(3).innerText)
    .eql("6.52")
    .hover(headers.value)
    .click(headers.value.find(".MuiDataGrid-menuIcon"))
    .click(tableMenu.find(".MuiMenuItem-root").withText("Sort by ASC"))
    .expect(firstRow.find(".MuiDataGrid-cell").nth(3).innerText)
    .eql("-28.6")
    .hover(headers.value)
    .click(headers.value.find(".MuiDataGrid-menuIcon"))
    .click(tableMenu.find(".MuiMenuItem-root").withText("Unsort"));

  // Sorting by date
  await t
    .click(buttons.all)
    .expect(firstRow.find(".MuiDataGrid-cell").nth(1).innerText)
    .eql("31.12.2018, 22:00:00")
    .hover(headers.time)
    .click(headers.time.find(".MuiDataGrid-menuIcon"))
    .click(tableMenu.find(".MuiMenuItem-root").withText("Sort by DESC"))
    .expect(firstRow.find(".MuiDataGrid-cell").nth(1).innerText)
    .eql("29.11.2021, 05:36:09")
    .hover(headers.time)
    .click(headers.time.find(".MuiDataGrid-menuIcon"))
    .click(tableMenu.find(".MuiMenuItem-root").withText("Unsort"));

  // Sorting by location
  await t
    .click(buttons.all)
    .expect(firstRow.find(".MuiDataGrid-cell").nth(0).innerText)
    .eql("Friman Metsola collective")
    .hover(headers.location)
    .click(headers.location.find(".MuiDataGrid-menuIcon"))
    .click(tableMenu.find(".MuiMenuItem-root").withText("Sort by DESC"))
    .expect(firstRow.find(".MuiDataGrid-cell").nth(0).innerText)
    .eql("PartialTech Research Farm")
    .hover(headers.location)
    .click(headers.location.find(".MuiDataGrid-menuIcon"))
    .click(tableMenu.find(".MuiMenuItem-root").withText("Unsort"));
});

test("Filters rows", async (t) => {
  const rows = pageModel.table.rows;
  const inputField = Selector("input").withAttribute(
    "placeholder",
    "Filter value"
  );

  await t
    .click(buttons.all)
    .hover(headers.type)
    .click(headers.type.find(".MuiButtonBase-root"))
    .click(tableMenu.find(".MuiMenuItem-root").withText("Filter"))
    .typeText(inputField, "rain")
    .pressKey("enter")
    .expect(rows.find(".MuiDataGrid-cell").withText("temperature").exists)
    .notOk()
    .expect(rows.find(".MuiDataGrid-cell").withText("pH").exists)
    .notOk();
});
