import { getDate, parseDate } from "./dateParser";
import { ERRORS } from "./constants";

describe("dateParser", () => {
  describe("parseDate", () => {
    it("Parses valid date from ISO string", () => {
      const iso = "2019-01-05T23:10:20.551Z";
      const iso2 = "2012-12-31T00:00:00.000Z";
      const expected = "05.01.2019, 23:10:21";
      const expected2 = "31.12.2012, 00:00:00";

      expect(parseDate(iso)).toEqual(expected);
      expect(parseDate(iso2)).toEqual(expected2);
    });

    it("Throws an error if input is missing", () => {
      expect(parseDate).toThrow(ERRORS.MISSING_DATE);
    });

    it("Throws an error if the input string is in the wrong format", () => {
      const badInput = "2019:01:05T23-10-20.551Z";
      const badInput2 = "Hello world!";
      let result;

      try {
        result = parseDate(badInput);
      } catch (e) {
        expect(e.message).toEqual(ERRORS.MALFORMED_INPUT);
        expect(result).toBeUndefined();
      }

      try {
        result = parseDate(badInput2);
      } catch (e) {
        expect(e.message).toEqual(ERRORS.MALFORMED_INPUT);
        expect(result).toBeUndefined();
      }
    });
  });

  describe("getDate", () => {
    it("Returns the parsed date if input is valid", () => {
      const iso = "2019-01-05T23:10:20.551Z";
      const iso2 = "2012-12-31T00:00:00.000Z";
      const expected = "05.01.2019, 23:10:21";
      const expected2 = "31.12.2012, 00:00:00";

      expect(getDate(iso)).toEqual(expected);
      expect(getDate(iso2)).toEqual(expected2);
    });

    it("Returns a default value of an empty string if the input is malformed", () => {
      const badInput = "2019:01:05T23-10-20.551Z";
      const badInput2 = "Hello world!";

      expect(getDate(badInput)).toEqual("");
      expect(getDate(badInput2)).toEqual("");
    });

    it("Returns placeholder text if the input is empty", () => {
      expect(getDate()).toEqual(ERRORS.MISSING_DATE);
    });
  });
});
