const normalizeDate = (dateInput) => {
  const inputString = typeof dateInput === "string" ? dateInput : dateInput?.toISOString?.();
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  let year;
  let month;
  let day;

  const isoDateMatch = inputString?.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoDateMatch) {
    year = Number(isoDateMatch[1]);
    month = Number(isoDateMatch[2]);
    day = Number(isoDateMatch[3]);
  } else {
    year = date.getUTCFullYear();
    month = date.getUTCMonth() + 1;
    day = date.getUTCDate();
  }

  const paddedMonth = String(month).padStart(2, "0");
  const paddedDay = String(day).padStart(2, "0");

  return {
    normalized: `${year}-${paddedMonth}-${paddedDay}`,
    date: new Date(Date.UTC(year, month - 1, day + 1)),
  };
};

// Export the function
export { normalizeDate };