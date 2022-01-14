import { FARM_IDS } from "./constants";

export const fetchFarmNames = async () => {
  const body = await fetch(`v1/farms`).then((res) => res.json());
  return body.map(({ farm_id, name }) => {
    return {
      id: farm_id,
      name,
    };
  });
};

export const getFarmStats = async (farm) => {
  return await fetch(`/v1/farms/${farm}/stats`).then((res) => res.json());
};

export const getStatsForAll = async () => {
  const promises = Object.values(FARM_IDS).map(
    async (id) =>
      await getFarmStats(id).then(({ measurements }) => measurements)
  );
  const measurements = await Promise.all(promises);
  return { measurements: measurements.flat() };
};
