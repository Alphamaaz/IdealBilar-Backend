import rentACarBookingInqueryModel from "../../rentACarInquiry/models/rentACarBookingInquery.model.js";
import RentalCar from "../model/rentalCar.model.js";
import {
  rentalcarValidation,
  rentalCarUpdateValidation,
} from "../validations/rentalCar.validation.js";

const parseJSONField = (value, fallback) => {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch (_error) {
    return fallback;
  }
};

const parseNumberField = (value) => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const parsedValue = Number(value);
  return Number.isNaN(parsedValue) ? undefined : parsedValue;
};

const parseBooleanField = (value) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }

  return undefined;
};

const normalizeFeatures = (features) => {
  if (features === undefined || features === null || features === "") {
    return undefined;
  }

  const parsedFeatures = parseJSONField(features, features);

  if (Array.isArray(parsedFeatures)) {
    return parsedFeatures
      .map((feature) => String(feature).trim())
      .filter(Boolean);
  }

  if (typeof parsedFeatures === "string") {
    return parsedFeatures
      .split(",")
      .map((feature) => feature.trim())
      .filter(Boolean);
  }

  return [];
};

const normalizeExistingImages = (images) => {
  const parsedImages = parseJSONField(images, []);

  if (!Array.isArray(parsedImages)) {
    return [];
  }

  return parsedImages.map((image, index) => {
    if (typeof image === "string") {
      return {
        url: image,
        isMain: index === 0,
        sortOrder: index,
      };
    }

    return {
      url: image.url,
      fileName: image.fileName,
      isMain: Boolean(image.isMain),
      sortOrder: parseNumberField(image.sortOrder) ?? index,
    };
  });
};

const mapUploadedImages = (files = [], startIndex = 0) =>
  files.map((file, index) => ({
    url: `/uploads/rental-cars/${file.filename}`,
    fileName: file.filename,
    isMain: false,
    sortOrder: startIndex + index,
  }));

const buildImagePayload = (rawData, files = [], isPartial = false) => {
  const existingImages = normalizeExistingImages(rawData.existingImages);
  const uploadedImages = mapUploadedImages(files, existingImages.length);
  const combinedImages = [...existingImages, ...uploadedImages];

  if (combinedImages.length === 0) {
    return isPartial ? undefined : [];
  }

  const mainImageIndex = parseNumberField(rawData.mainImageIndex) ?? 0;

  return combinedImages.map((image, index) => ({
    ...image,
    isMain: index === mainImageIndex,
    sortOrder: parseNumberField(image.sortOrder) ?? index,
  }));
};

const normalizeRentalCarPayload = (rawData, files = [], isPartial = false) => {
  const images = buildImagePayload(rawData, files, isPartial);
  const make = rawData.make?.trim();
  const model = rawData.model?.trim();
  const derivedTitle = [make, model, rawData.variant?.trim()].filter(Boolean).join(" ");
  const hasPricingInput =
    rawData.pricing !== undefined ||
    rawData.pricePerDay !== undefined ||
    rawData.pricePerWeek !== undefined ||
    rawData.pricePerMonth !== undefined ||
    rawData.currency !== undefined;
  const parsedPricing = hasPricingInput
    ? (
        parseJSONField(rawData.pricing, null) ??
        {
          perDay: parseNumberField(rawData.pricePerDay),
          perWeek: parseNumberField(rawData.pricePerWeek),
          perMonth: parseNumberField(rawData.pricePerMonth),
          currency: rawData.currency?.trim() || "SEK",
        }
      )
    : undefined;
  const normalizedFeatures = normalizeFeatures(rawData.features);

  const thumbnail = rawData.thumbnail?.trim() || images?.find((image) => image.isMain)?.url;

  return {
    title: rawData.title?.trim() || derivedTitle || undefined,
    make,
    model,
    variant: rawData.variant?.trim() || undefined,
    year: parseNumberField(rawData.year),
    mileage: parseNumberField(rawData.mileage),
    power: parseNumberField(rawData.power),
    seats: parseNumberField(rawData.seats),
    fuel: rawData.fuel?.trim() || undefined,
    transmission: rawData.transmission?.trim() || undefined,
    vehicleType: rawData.vehicleType?.trim() || undefined,
    color: rawData.color?.trim() || undefined,
    pricing: parsedPricing,
    description: rawData.description?.trim() || undefined,
    features: normalizedFeatures,
    images,
    thumbnail,
    dealer: parseJSONField(rawData.dealer, undefined),
    location: rawData.location?.trim() || undefined,
    status: rawData.status?.trim() || undefined,
    isFeatured: parseBooleanField(rawData.isFeatured),
  };
};

const removeUndefinedFields = (payload) =>
  Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined),
  );

const registerCarRentalService = async (rentalCar, files = []) => {
  try {
    const normalizedPayload = normalizeRentalCarPayload(rentalCar, files);
    const { success, data, error } = rentalcarValidation(normalizedPayload);

    if (!success) {
      return {
        success: false,
        status: 400,
        message: error.issues.map((issue) => issue.message).join(", "),
      };
    }

    const createdRentalCar = await RentalCar.create({
      ...data,
      images: data.images ?? [],
      features: data.features ?? [],
      thumbnail: data.thumbnail ?? data.images?.find((image) => image.isMain)?.url,
      pricing: {
        perDay: data.pricing.perDay,
        perWeek: data.pricing.perWeek,
        perMonth: data.pricing.perMonth,
        currency: data.pricing.currency ?? "SEK",
      },
      status: data.status ?? "available",
      isFeatured: data.isFeatured ?? false,
    });

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

const getAllCarRentalsService = async () => {
  try {
    const carRentals = await RentalCar.find();
    return {
      success: true,
      status: 200,
      data: carRentals,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: "An error occurred while fetching car rentals",
      error: error.message
    };
  }
};

const getCarRentalByIdService = async (id) => {
  try {
    const carRental = await RentalCar.findById(id);
    if (!carRental) {
      return {
        success: false,
        status: 404,
        message: "Car rental not found",
      };
    }
    const bookingDetails = await rentACarBookingInqueryModel.find({
      carId: id
    }).populate();
    const carRentalData = carRental.toObject();
    carRentalData.bookings = bookingDetails;
    return {
      success: true,
      status: 200,
      data: carRentalData,
    };
  } catch (error) {
    if (error.name === "CastError") {
      return {
        success: false,
        status: 400,
        message: "Invalid car rental ID format",
        error: error.message
      };
    }
    return {
      success: false,
      status: 500,
      message: "An error occurred while fetching the car rental",
      error: error.message
    };
  }
};

const updateCarRentalService = async (id, updateData, files = []) => {
  try {
    const normalizedPayload = removeUndefinedFields(
      normalizeRentalCarPayload(updateData, files, true),
    );
    const { success, data, error } = rentalCarUpdateValidation(normalizedPayload);

    if (!success) {
      return {
        success: false,
        status: 400,
        message: error.issues.map((issue) => issue.message).join(", "),
      };
    }

    const updatedCarRental = await RentalCar.findByIdAndUpdate(id, data, { new: true });
    if (!updatedCarRental) {
      return {
        success: false,
        status: 404,
        message: "Car rental not found",
      };
    }
    return {
      success: true,
      status: 200,
      data: updatedCarRental,
    };
  } catch (error) {
    if (error.name === "CastError") {
      return {
        success: false,
        status: 400,
        message: "Invalid car rental ID format",
        error: error.message  
      };
    }
    return {
      success: false,
      status: 500,
      message: "An error occurred while updating the car rental",
      error: error.message
    };
  }
};

const deleteCarRentalService = async (id) => {
  try {
    const deletedCarRental = await RentalCar.findByIdAndDelete(id);
    if (!deletedCarRental) {
      return {
        success: false,
        status: 404,
        message: "Car rental not found",
      };
    }
    return {
      success: true,
      status: 200,
      message: "Car rental deleted successfully",
    };
  } catch (error) {
    if (error.name === "CastError") {
      return {
        success: false,
        status: 400,
        message: "Invalid car rental ID format",
        error: error.message  
      };
    }
    return {
      success: false,
      status: 500,
      message: "An error occurred while deleting the car rental",
      error: error.message
    };
  }
};


export {
  registerCarRentalService,
  getAllCarRentalsService,
  getCarRentalByIdService,
  updateCarRentalService,
  deleteCarRentalService,
};
