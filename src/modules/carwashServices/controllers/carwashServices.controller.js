
import { validateCarWashServiceSchema } from "../validators/carwashServices.validation.js";
import {
  createCarWashServiceService,
  getCarWashServicesService,
  deleteCarWashServiceService,
  updateCarWashServiceService,
  getServicesByVehicleTypeService,
  getServiceByIdService,
  getAvailableVehicleTypesService,
  searchCarWashServicesService,
} from "./../services/carwashServices.services.js";

/**
 * Create a new car wash service
 */
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
      const errorMessages = error.errors.map(err => ({
        field: err.path.join("."),
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errorMessages,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create car wash service",
      error: error.message,
    });
  }
};

/**
 * Get all car wash services with optional filters
 */
export const getCarWashServicesController = async (req, res) => {
  try {
    const { isActive } = req.query;
    const filters = {};

    if (isActive !== undefined) {
      filters.isActive = isActive === "true";
    }

    const result = await getCarWashServicesService(filters);
    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve car wash services",
      error: error.message,
    });
  }
};

/**
 * Get services by vehicle type
 */
export const getServicesByVehicleTypeController = async (req, res) => {
  try {
    const { vehicleType } = req.params;

    if (!vehicleType) {
      return res.status(400).json({
        success: false,
        message: "Vehicle type is required",
      });
    }

    const result = await getServicesByVehicleTypeService(vehicleType);
    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve services by vehicle type",
      error: error.message,
    });
  }
};

/**
 * Get a single service by ID
 */
export const getServiceByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getServiceByIdService(id);
    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    if (error.message === "Service category not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve service",
      error: error.message,
    });
  }
};

/**
 * Get all available vehicle types
 */
export const getAvailableVehicleTypesController = async (req, res) => {
  try {
    const result = await getAvailableVehicleTypesService();
    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve vehicle types",
      error: error.message,
    });
  }
};

/**
 * Update a car wash service
 */
export const updateCarWashServiceController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await updateCarWashServiceService(id, updateData);
    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    if (error.message === "Service category not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update car wash service",
      error: error.message,
    });
  }
};

/**
 * Delete a car wash service
 */
export const deleteCarWashServiceController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteCarWashServiceService(id);
    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    if (error.message === "Service category not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete car wash service",
      error: error.message,
    });
  }
};

/**
 * Search car wash services
 */
export const searchCarWashServicesController = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const result = await searchCarWashServicesService(q);
    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Search failed",
      error: error.message,
    });
  }
};
