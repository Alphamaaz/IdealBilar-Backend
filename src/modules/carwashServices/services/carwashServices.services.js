import ServiceCategory from "../models/carwashServices.model.js";

/**
 * Create a new car wash service category
 * @param {Object} carWashServiceData - Service category data
 * @returns {Object} Created service category
 */
export const createCarWashServiceService = async (carWashServiceData) => {
  const newServiceCategory = new ServiceCategory(carWashServiceData);
  const savedCategory = await newServiceCategory.save();

  return {
    message: "Car wash service created successfully",
    data: savedCategory,
  };
};

/**
 * Get all car wash services with optional filters
 * @param {Object} filters - Filter options (vehicleType, isActive, etc.)
 * @returns {Object} Service categories
 */
export const getCarWashServicesService = async (filters = {}) => {
  const query = {};

  // Filter by active status
  if (filters.isActive !== undefined) {
    query.isActive = filters.isActive;
  }

  // Sort by order
  const services = await ServiceCategory.find(query).sort({ order: 1 });

  return {
    message: "Car wash services retrieved successfully",
    data: services,
  };
};

/**
 * Get services filtered by vehicle type
 * @param {string} vehicleType - Vehicle type name
 * @returns {Object} Filtered service categories
 */
export const getServicesByVehicleTypeService = async (vehicleType) => {
  const services = await ServiceCategory.find({
    "vehicleType.name": vehicleType,
  }).sort({ order: 1 });

  if (!services || services.length === 0) {
    return {
      message: `No services found for vehicle type: ${vehicleType}`,
      data: [],
    };
  }

  return {
    message: `Services retrieved for vehicle type: ${vehicleType}`,
    data: services,
  };
};

/**
 * Get a single service category by ID
 * @param {string} id - Service category ID
 * @returns {Object} Service category
 */
export const getServiceByIdService = async (id) => {
  const service = await ServiceCategory.findById(id);

  if (!service) {
    throw new Error("Service category not found");
  }

  return {
    message: "Service category retrieved successfully",
    data: service,
  };
};

/**
 * Get all available vehicle types across all services
 * @returns {Object} Array of unique vehicle types
 */
export const getAvailableVehicleTypesService = async () => {
  const services = await ServiceCategory.find();

  // Extract unique vehicle types
  const vehicleTypes = [];
  const vehicleTypeNames = new Set();

  services.forEach((service) => {
    if (service.vehicleType && Array.isArray(service.vehicleType)) {
      service.vehicleType.forEach((vehicle) => {
        if (!vehicleTypeNames.has(vehicle.name)) {
          vehicleTypeNames.add(vehicle.name);
          vehicleTypes.push(vehicle);
        }
      });
    }
  });

  return {
    message: "Available vehicle types retrieved successfully",
    data: vehicleTypes,
  };
};

/**
 * Update a car wash service category
 * @param {string} id - Service category ID
 * @param {Object} updateData - Data to update
 * @returns {Object} Updated service category
 */
export const updateCarWashServiceService = async (id, updateData) => {
  const updatedService = await ServiceCategory.findByIdAndUpdate(
    id,
    updateData,
    { returnDocument: "after"}
  );

  if (!updatedService) {
    throw new Error("Service category not found");
  }

  return {
    message: "Car wash service updated successfully",
    data: updatedService,
  };
};

/**
 * Delete a car wash service category
 * @param {string} id - Service category ID
 * @returns {Object} Success message
 */
export const deleteCarWashServiceService = async (id) => {
  const deletedService = await ServiceCategory.findByIdAndDelete(id);

  if (!deletedService) {
    throw new Error("Service category not found");
  }

  return {
    message: "Car wash service deleted successfully",
  };
};

/**
 * Search for services by name or description
 * @param {string} searchTerm - Search term
 * @returns {Object} Matching services
 */
export const searchCarWashServicesService = async (searchTerm) => {
  const regex = new RegExp(searchTerm, "i");
  const services = await ServiceCategory.find({
    $or: [
      { categoryName: regex },
      { "services.name": regex },
      { "services.description": regex },
    ],
  }).sort({ order: 1 });

  return {
    message: `Search results for "${searchTerm}"`,
    data: services,
  };
};