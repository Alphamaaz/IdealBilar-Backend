// Internal modules
import { pick } from "zod/mini";
import settingErrorStatusAndMessage from "../../../shared/utils/settingErrorStatusAndMessage.js";
import { rentACarService } from "../services/rentACarInquiry.service.js";
import { rentACarDataValidationFunction } from "../validations/rentACarInquiry.validation.js";
import { normalizeDate } from "../../../shared/utils/normalizeToDateOnlyUTC.js";

const rentACarController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const filePath = req.file.path.replace(/\\/g, "/");

    // Build correct structure
    const inputData = {
      ...req.body,
      image: {
        url: filePath, // or your hosted URL
        isMain: true,
        sortOrder: 0,
      },
    };

    const { success, data, error } = rentACarDataValidationFunction(inputData);

    if (!success) {
      const validationError = settingErrorStatusAndMessage(error);
      return res.status(validationError.status).json(validationError);
    }

    // console.log("Validation pass ", data);
    const correctDataFormat = {
      ...data,
      pickupDate: normalizeDate(data.pickupDate).date,
      returnDate: normalizeDate(data.returnDate).date,
      path: data.image.url, // Assuming your service expects just the URL
    };

    const result = await rentACarService(correctDataFormat);

    res.status(200).json({
      success: true,
      message: "Processed the rent a car successfully!",
      data: result,
    });
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
