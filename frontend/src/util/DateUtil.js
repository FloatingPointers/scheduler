//Converts a date object to UTC time

export function toUTC(someDate) {
  return someDate
    ? new Date(
        someDate.getUTCFullYear(),
        someDate.getUTCMonth(),
        someDate.getUTCDate(),
        someDate.getUTCHours(),
        someDate.getUTCMinutes()
      )
    : new Date(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate(),
        new Date().getUTCHours(),
        new Date().getUTCMinutes()
      );
}
