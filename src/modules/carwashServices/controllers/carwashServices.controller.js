
import { validateCarWashServiceSchema } from "../validators/carwashServices.validation.js";
import { createCarWashServiceService } from './../services/carwashServices.services.js';

export const createCarWashServiceController = async (req, res) => {
  try {
    const validatedData = validateCarWashServiceSchema(req.body);

    const result = await createCarWashServiceService(validatedData);

    return res.status(201).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    // Zod validation error handling
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create car wash service",
      error: error.message,
    });
  }
};
