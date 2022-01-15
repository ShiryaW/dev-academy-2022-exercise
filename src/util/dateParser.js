import { ERRORS } from "./constants";

export const parseDate = (iso) => {
  // Input format: 2019-01-01T23:10:20.551Z
  if (!iso) throw new Error(ERRORS.MISSING_DATE);
  let date, time, dateArr, timeArr;

  try {
    [date, time] = iso.slice(0, -1).split("T");
    dateArr = date.split("-");
    timeArr = time.split(":");
  } catch (e) {
    throw new Error(ERRORS.MALFORMED_INPUT);
  }

  if (!date || !time || dateArr.length !== 3 || timeArr.length !== 3)
    throw new Error(ERRORS.MALFORMED_INPUT);

  return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}, ${timeArr[0]}:${
    timeArr[1]
  }:${Math.round(timeArr[2]).toString().padStart(2, "0")}`;
};

export const getDate = (iso) => {
  let result = ""; // fallback on an empty string if validation fails

  try {
    result = parseDate(iso);
  } catch (e) {
    if (e.message === ERRORS.MISSING_DATE) return e.message; // display placeholder text if there is no date
  }

  return result;
};
