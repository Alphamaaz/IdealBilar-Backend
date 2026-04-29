const allowedFilters = new Set([
  "today",
  "lastWeek",
  "last30Days",
  "thisMonth",
  "lastMonth",
  "all",
  "custom",
]);

const startOfDay = (date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

const endOfDay = (date) => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

const parseInputDate = (value) => {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
};

const getDashboardFilterValidation = (query = {}) => {
  const requestedFilter =
    typeof query.filter === "string" && query.filter.trim().length > 0
      ? query.filter.trim()
      : "last30Days";

  if (!allowedFilters.has(requestedFilter)) {
    return {
      success: false,
      status: 400,
      message:
        "Invalid dashboard filter. Use today, lastWeek, last30Days, thisMonth, lastMonth, all, or custom.",
    };
  }

  const now = new Date();

  if (
    requestedFilter === "custom" ||
    typeof query.startDate === "string" ||
    typeof query.endDate === "string"
  ) {
    if (!query.startDate || !query.endDate) {
      return {
        success: false,
        status: 400,
        message: "Both startDate and endDate are required for a custom range.",
      };
    }

    const parsedStartDate = parseInputDate(query.startDate);
    const parsedEndDate = parseInputDate(query.endDate);

    if (!parsedStartDate || !parsedEndDate) {
      return {
        success: false,
        status: 400,
        message: "startDate and endDate must be valid dates.",
      };
    }

    const startDate = startOfDay(parsedStartDate);
    const endDate = endOfDay(parsedEndDate);

    if (startDate > endDate) {
      return {
        success: false,
        status: 400,
        message: "startDate must be before or equal to endDate.",
      };
    }

    return {
      success: true,
      data: {
        filter: "custom",
        startDate,
        endDate,
      },
    };
  }

  if (requestedFilter === "all") {
    return {
      success: true,
      data: {
        filter: requestedFilter,
        startDate: null,
        endDate: null,
      },
    };
  }

  let startDate = new Date(now);
  let endDate = new Date(now);

  switch (requestedFilter) {
    case "today":
      startDate = startOfDay(now);
      break;
    case "lastWeek":
      startDate = startOfDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6));
      break;
    case "last30Days":
      startDate = startOfDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29));
      break;
    case "thisMonth":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "lastMonth":
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      endDate = endOfDay(new Date(now.getFullYear(), now.getMonth(), 0));
      break;
    default:
      break;
  }

  return {
    success: true,
    data: {
      filter: requestedFilter,
      startDate,
      endDate,
    },
  };
};

export { getDashboardFilterValidation };
