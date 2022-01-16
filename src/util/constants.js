export const SERVICE_URL = "http://localhost";
export const SERVICE_PORT = 8080;
export const ALL = "all";

export const ERRORS = {
  MISSING_DATE: "Date missing",
  MALFORMED_INPUT: "Malformed input",
};

export const FARM_NAMES = {
  FRIMAN: "Friman Metsola Collective",
  PARTIALTECH: "PartialTech Research Farm",
  NOORA: "Noora's Farm",
  OSSI: "Organic Ossi's Impact That Lasts Plantation",
};

export const FARM_IDS = {
  [FARM_NAMES.FRIMAN]: 1,
  [FARM_NAMES.PARTIALTECH]: 2,
  [FARM_NAMES.NOORA]: 3,
  [FARM_NAMES.OSSI]: 4,
};

export const FIELD_KEYS = {
  DATETIME: "datetime",
  DATETIME_RAW: "datetime_raw",
  FARM_ID: "farm_id",
  ID: "id",
  LOCATION: "location",
  SENSOR_TYPE: "sensor_type",
  VALUE: "value",
};

export const SENSOR_TYPES = {
  TEMPERATURE: "temperature",
  RAINFALL: "rainfall",
  PH: "pH",
};
