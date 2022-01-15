import { FARM_IDS } from "./constants";

export const fetchFarmNames = async () => {
  const res = await fetch(`v1/farms`);

  if (res.status !== 200) return { error: res.statusText };

  const body = await res.json();

  return body.map(({ farm_id, name }) => {
    return {
      id: farm_id,
      name,
    };
  });
};

export const getFarmStats = async (farm) => {
  const res = await fetch(`/v1/farms/${farm}/stats`);

  if (res.status !== 200) return { error: res.statusText };

  return await res.json();
};

export const getStatsForAll = async () => {
  const promises = Object.values(FARM_IDS).map(
    async (id) =>
      await getFarmStats(id).then(({ measurements }) => measurements)
  );
  const measurements = await Promise.all(promises);
  return { measurements: measurements.flat() };
};
