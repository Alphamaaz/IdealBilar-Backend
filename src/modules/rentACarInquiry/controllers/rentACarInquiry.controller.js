import settingErrorStatusAndMessage from "../../../shared/utils/settingErrorStatusAndMessage.js";
import { rentACarService } from "../services/rentACarInquiry.service.js";
import { rentACarDataValidationFunction } from "../validations/rentACarInquiry.validation.js";
import { normalizeDate } from "../../../shared/utils/normalizeToDateOnlyUTC.js";

const rentACarController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "License Image is required",
      });
    }

    const filePath = `/uploads/licenses/${req.file.filename}`;

    // Build correct structure
    const inputData = {
      ...req.body,
      licenseImage: {
        url: filePath, // or your hosted URL
        isMain: true,
        sortOrder: 0,
      },
    };

    const { success, data, error } = rentACarDataValidationFunction(inputData);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: error.issues
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join(", "),
      });
    }

    // console.log("Validation pass ", data);
    const correctDataFormat = {
      ...data,
      userId: req.userId,
      pickupDate: normalizeDate(data.pickupDate).date,
      returnDate: normalizeDate(data.returnDate).date,
      licenseImage: data.licenseImage.url,
    };

    const result = await rentACarService(correctDataFormat);

    if (!result.success) {
      return res.status(result.status || 500).json(result);
    }

    res.status(result.status).json(result);
  } catch (err) {
    // console.error("Error occur during rent a car processing:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err?.message || "Unexpected error",
    });
  }
};

//exports
export { rentACarController };
