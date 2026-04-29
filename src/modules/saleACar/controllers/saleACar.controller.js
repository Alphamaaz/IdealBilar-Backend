import settingErrorStatusAndMessage from "../../../shared/utils/settingErrorStatusAndMessage.js";
import settingResponse from "../../../shared/utils/settingResponse.js";
import {
  createSaleACarService,
  deleteSaleACarInquiryService,
  getAllSaleACarInquiriesService,
} from "../services/saleACar.service.js";
import { saleACarValidation } from "../validations/saleACar.validation.js";

const normalizeBoolean = (value) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value !== "string") {
    return false;
  }

  const normalized = value.trim().toLowerCase();
  return ["true", "1", "yes", "on"].includes(normalized);
};

const normalizePreferredContact = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  const normalized = value.trim().toLowerCase().replace(/\s+/g, "_");

  if (normalized === "phone" || normalized === "phone-call") {
    return "phone_call";
  }

  return normalized;
};

const normalizeMechanicalCondition = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  return value.trim().toLowerCase();
};

const buildImagePayload = (files, mainImageIndex) => {
  const normalizedMainImageIndex = Number.isInteger(mainImageIndex)
    ? mainImageIndex
    : 0;

  return files.map((file, index) => ({
    url: `/uploads/sale-a-car/${file.filename}`,
    fileName: file.filename,
    isMain: index === normalizedMainImageIndex,
    sortOrder: index,
  }));
};

const createSaleACarController = async (req, res) => {
  try {
    const files = Array.isArray(req.files) ? req.files : [];
    const parsedMainImageIndex = Number.parseInt(req.body.mainImageIndex, 10);
    const images = buildImagePayload(
      files,
      Number.isNaN(parsedMainImageIndex) ? 0 : parsedMainImageIndex,
    );

    const saleACarData = {
      year: req.body.year,
      brand: req.body.brand,
      model: req.body.model,
      transmission: req.body.transmission,
      mileage: req.body.mileage,
      mechanicalCondition: normalizeMechanicalCondition(
        req.body.mechanicalCondition,
      ),
      exteriorBlemishes: req.body.exteriorBlemishes ?? "",
      smokeFreeCabin: normalizeBoolean(req.body.smokeFreeCabin),
      images,
      wantToSell: normalizeBoolean(req.body.wantToSell),
      assignBrokerage: normalizeBoolean(req.body.assignBrokerage),
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      preferredContact: normalizePreferredContact(req.body.preferredContact),
      agreementAccepted: normalizeBoolean(req.body.agreementAccepted),
    };

    const { success, data, error } = saleACarValidation(saleACarData);

    if (!success) {
      const validationError = settingErrorStatusAndMessage(error);
      return settingResponse(res, validationError);
    }

    const inquiryPayload = {
      vehicleTitle: `${data.year} ${data.brand} ${data.model}`.trim(),
      vehicleInfo: {
        year: data.year,
        brand: data.brand,
        model: data.model,
        transmission: data.transmission,
        mileage: data.mileage,
      },
      condition: {
        mechanicalCondition: data.mechanicalCondition,
        exteriorBlemishes: data.exteriorBlemishes,
        smokeFreeCabin: data.smokeFreeCabin,
      },
      images: data.images,
      sellingPreferences: {
        wantToSell: data.wantToSell,
        assignBrokerage: data.assignBrokerage,
      },
      ownerInformation: {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        preferredContact: data.preferredContact,
      },
      agreementAccepted: data.agreementAccepted,
    };

    const result = await createSaleACarService(inquiryPayload);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create sale a car inquiry",
      error: error.message,
    });
  }
};

const getAllSaleACarInquiriesController = async (_req, res) => {
  try {
    const result = await getAllSaleACarInquiriesService();
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch sale a car inquiries",
      error: error.message,
    });
  }
};

const deleteSaleACarInquiryController = async (req, res) => {
  try {
    const result = await deleteSaleACarInquiryService(req.params.id);
    res.status(result.status).json(result);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid sale a car inquiry ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete sale a car inquiry",
      error: error.message,
    });
  }
};

export {
  createSaleACarController,
  getAllSaleACarInquiriesController,
  deleteSaleACarInquiryController,
};
