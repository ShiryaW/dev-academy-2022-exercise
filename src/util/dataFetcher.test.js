import fetchMock from "jest-fetch-mock";
import { fetchFarmNames, getFarmStats } from "./dataFetcher";

describe("dataFetcher", () => {
  describe("fetchFarmNames", () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it("Fetches info on available farms", async () => {
      const response = [
        { farm_id: 1, name: "Test" },
        { farm_id: 2, name: "Some farm" },
        { farm_id: 3, name: "Some other farm" },
      ];

      mockSuccessResponse(response);

      const res = await fetchFarmNames();
      const expected = [
        { id: 1, name: "Test" },
        { id: 2, name: "Some farm" },
        { id: 3, name: "Some other farm" },
      ];

      expect(fetch.mock.calls.length).toEqual(1);
      expect(res.error).toBeUndefined();
      expect(res).toEqual(expected);
    });

    it("Returns the response's error message if something goes wrong", async () => {
      fetchMock.mockImplementation(mockErrorResponse);

      const res = await fetchFarmNames();

      expect(fetch.mock.calls.length).toEqual(1);
      expect(res.error).toEqual("Internal server error");
    });
  });

  describe("getFarmStats", () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it("Fetches data for a given farm", async () => {
      const response = {
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
            value: -9,
            farm_id: "1",
            sensor_type: "temperature",
          },
        ],
      };

      mockSuccessResponse(response);

      const result = await getFarmStats(1);

      expect(fetch.mock.calls.length).toEqual(1);
      expect(result).toHaveProperty("measurements");
      expect(result.measurements.length).toBe(3);
    });

    it("Returns an error if the farm does not exist", async () => {
      fetchMock.mockImplementation(mockErrorResponse);

      const result = await getFarmStats(8);

      expect(fetch.mock.calls.length).toEqual(1);
      expect(result).toHaveProperty("error");
      expect(result.error).toEqual("Internal server error");
    });
  });
});

const mockSuccessResponse = (body) => {
  fetchMock.mockResponse(JSON.stringify(body));
};

const mockErrorResponse = async () => {
  return Promise.resolve(
    new Response(null, {
      status: 500,
      statusText: "Internal server error",
    })
  );
};
