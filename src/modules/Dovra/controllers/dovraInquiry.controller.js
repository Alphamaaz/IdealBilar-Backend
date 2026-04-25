import settingErrorStatusAndMessage from "../../../shared/utils/settingErrorStatusAndMessage.js";
import settingResponse from "../../../shared/utils/settingResponse.js";
import {
  createDovraInquiryService,
  deleteDovraInquiryService,
  getAllDovraInquiriesService,
} from "../services/dovraInquiry.service.js";
import { dovraInquiryValidation } from "../validations/dovraInquiry.validation.js";

const createDovraInquiryController = async (req, res) => {
  try {
    const { success, data, error } = dovraInquiryValidation(req.body);

    if (!success) {
      const validationError = settingErrorStatusAndMessage(error);
      return settingResponse(res, validationError);
    }

    const inquiryPayload = {
      carImage: data.carImage,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      country: data.country,
      phoneNumber: data.phoneNumber,
      interestedIn: data.interestedIn,
      closestDealer: data.closestDealer,
      inquiryPreferences: {
        wantToOrderDovra: data.wantToOrderDovra,
        getMoreInformation: data.getMoreInformation,
        bookShowingInPerson: data.bookShowingInPerson,
      },
      consent: data.consent,
    };

    const result = await createDovraInquiryService(inquiryPayload);

    res.status(201).json({
      success: true,
      message: "Dovra inquiry created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create Dovra inquiry",
      error: error.message,
    });
  }
};

const getAllDovraInquiriesController = async (_req, res) => {
  try {
    const result = await getAllDovraInquiriesService();
    res.status(200).json({
      success: true,
      message: "Dovra inquiries fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Dovra inquiries",
      error: error.message,
    });
  }
};

const deleteDovraInquiryController = async (req, res) => {
  try {
    const result = await deleteDovraInquiryService(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Dovra inquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Dovra inquiry deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Dovra inquiry ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete Dovra inquiry",
      error: error.message,
    });
  }
};

export {
  createDovraInquiryController,
  getAllDovraInquiriesController,
  deleteDovraInquiryController,
};
