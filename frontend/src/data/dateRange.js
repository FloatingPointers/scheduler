import { format } from "date-fns";

const formatDateRange = (startDate, endDate) => {
  const first = format(startDate, "LLL do");

  let second = null;
  if (startDate.getMonth() === endDate.getMonth()) {
    second = format(endDate, "do");
  } else {
    second = format(endDate, "LLL do");
  }
  return first + " - " + second;
};

export default formatDateRange;
