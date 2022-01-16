import { datesort, parseDayMonthYear } from "./sorter";

describe("sorter", () => {
  it("returns -1 if an earlier date is compared with a later date", () => {
    const earlierDate = "27.11.2020, 00:01:43";
    const laterDate = "27.11.2021, 00:01:43";

    expect(datesort(earlierDate, laterDate)).toBe(-1);

    const earlierMonth = "27.03.2020, 00:01:43";
    const laterMonth = "27.05.2020, 00:01:43";

    expect(datesort(earlierMonth, laterMonth)).toBe(-1);

    const earlierDay = "03.02.2020, 00:01:43";
    const laterDay = "05.02.2020, 00:01:43";

    expect(datesort(earlierDay, laterDay)).toBe(-1);
  });

  it("returns 1 if a later date is compared with an earlier date", () => {
    const earlierDate = "27.11.2020, 00:01:43";
    const laterDate = "27.11.2021, 00:01:43";

    expect(datesort(laterDate, earlierDate)).toBe(1);

    const earlierMonth = "27.03.2020, 00:01:43";
    const laterMonth = "27.05.2020, 00:01:43";

    expect(datesort(laterMonth, earlierMonth)).toBe(1);

    const earlierDay = "03.02.2020, 00:01:43";
    const laterDay = "05.02.2020, 00:01:43";

    expect(datesort(laterDay, earlierDay)).toBe(1);
  });

  it("returns 0 if two identical dates are compared", () => {
    const testDate = "16.02.2021, 21:00:00";
    expect(datesort(testDate, testDate)).toBe(0);
  });
});

describe("parseDayMonthYear", () => {
  it("extracts day, month and year from a given date string", () => {
    const testDate = "27.03.2020, 00:01:43";
    expect(parseDayMonthYear(testDate)).toEqual([27, 3, 2020]);
  });
});
