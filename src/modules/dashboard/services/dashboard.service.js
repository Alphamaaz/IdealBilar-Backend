import { getDashboardSummaryRepository } from "../repositories/dashboard.repository.js";

const getDashboardSummaryService = async (dateRange) => {
  const result = await getDashboardSummaryRepository(dateRange);

  return {
    success: true,
    status: 200,
    message: "Dashboard summary fetched successfully",
    data: {
      filter: {
        type: dateRange.filter,
        startDate: dateRange.startDate ? dateRange.startDate.toISOString() : null,
        endDate: dateRange.endDate ? dateRange.endDate.toISOString() : null,
      },
      ...result,
    },
  };
};

export { getDashboardSummaryService };
