import RentalCar from "../model/rentalCar.model.js";
import { rentalcarValidation } from "../validations/rentalCar.validation.js";

const registerCarRentalService = async (rentalCar) => {
  try {
    const { success, data, error } = rentalcarValidation(rentalCar);

    if (!success) {
      return {
        success: false,
        status: 400,
        message: error.issues.map((issue) => issue.message).join(", "),
      };
    }

    const mainImage = data.images?.find((image) => image.isMain) ?? data.images?.[0];

    const carPayload = {
      ...data,
      images: data.images ?? [],
      features: data.features ?? [],
      thumbnail: data.thumbnail ?? mainImage?.url,
      price: data.price
        ? {
            value: data.price.value,
            currency: data.price.currency ?? "SEK",
          }
        : undefined,
      dealer: data.dealer ?? undefined,
      status: data.status ?? "available",
      isFeatured: data.isFeatured ?? false,
    };

    const createdRentalCar = await RentalCar.create(carPayload);

    return {
      success: true,
      status: 201,
      message: "Car rental registered successfully",
      data: createdRentalCar,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: "An error occurred while registering the car rental",
      error: error.message
    };
  }
};

export {
  registerCarRentalService,
};
