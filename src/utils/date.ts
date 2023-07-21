export const ONE_DAY = 24 * 60 * 60 * 1000;
export const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
export const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
export const ONE_YEAR = 12 * 30 * 24 * 60 * 60 * 1000;

export const getDate = (time: number | undefined | null) => {
  if (!time) {
    return "unknow time";
  }
  const currentTime = Date.now();
  const difference = currentTime - time;

  if (difference < ONE_DAY) {
    return "today";
  }
  if (difference < ONE_WEEK) {
    return output(difference, ONE_DAY, "day", "days");
  }
  if (difference < ONE_MONTH) {
    return output(difference, ONE_WEEK, "week", "weeks");
  }
  if (difference < ONE_YEAR) {
    return output(difference, ONE_MONTH, "month", "months");
  }
  return "more than a year ago";
};

const output = (dif: number, divisor: number, singular: string, plural: string) => {
  const amount = Math.trunc(dif / divisor);
  return `${String(amount)} ${amount > 1 ? plural : singular} ago`;
};
