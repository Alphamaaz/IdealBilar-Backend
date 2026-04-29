import { getDashboardSummaryService } from "../services/dashboard.service.js";
import { getDashboardFilterValidation } from "../validations/dashboard.validation.js";

const getDashboardSummaryController = async (req, res) => {
  try {
    const validationResult = getDashboardFilterValidation(req.query);

    if (!validationResult.success) {
      return res.status(validationResult.status).json({
        success: false,
        message: validationResult.message,
      });
    }

    const result = await getDashboardSummaryService(validationResult.data);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard summary",
      error: error.message,
    });
  }
};

export { getDashboardSummaryController };
