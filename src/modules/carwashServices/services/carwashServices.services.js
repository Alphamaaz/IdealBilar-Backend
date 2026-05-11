import ServiceCategory from "../models/carwashServices.model.js";

export const createCarWashServiceService = async (carWashServiceData) => {
  const newServiceCategory = new ServiceCategory(carWashServiceData);
  const savedCategory = await newServiceCategory.save();

  return {
    message: "Car wash service created successfully",
    data: savedCategory,
  };
};
