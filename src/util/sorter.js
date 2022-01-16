export const datesort = (date1, date2) => {
  const [day1, month1, year1] = parseDayMonthYear(date1);
  const [day2, month2, year2] = parseDayMonthYear(date2);

  if (year1 < year2) return -1;
  else if (year1 === year2) {
    if (month1 < month2) return -1;
    else if (month1 === month2) {
      if (day1 < day2) return -1;
      else if (day1 === day2) return 0;
      else return 1;
    } else return 1;
  } else return 1;
};

export const parseDayMonthYear = (date) => {
  return date
    .split(",")[0]
    .split(".")
    .map((n) => parseInt(n));
};
