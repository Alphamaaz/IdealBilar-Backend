import settingErrorStatusAndMessage from "../../../shared/utils/settingErrorStatusAndMessage.js";
import settingResponse from "../../../shared/utils/settingResponse.js";
import {
  createCarWashBookingService,
  deleteCarWashBookingService,
  getAllCarWashBookingsService,
  getBookedTimesByDateService,
} from "../services/carWashBooking.service.js";
import {
  carWashBookingDateLookupValidation,
  carWashBookingValidation,
} from "../validations/carWashBooking.validation.js";

const createCarWashBookingController = async (req, res) => {
  try {
    const { success, data, error } = carWashBookingValidation(req.body);

    if (!success) {
      const validationError = settingErrorStatusAndMessage(error);
      return settingResponse(res, validationError);
    }

    const result = await createCarWashBookingService(data);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create car wash booking",
      error: error.message,
    });
  }
};

const getBookedTimesByDateController = async (req, res) => {
  try {
    const { success, data, error } = carWashBookingDateLookupValidation(req.query);

    if (!success) {
      const validationError = settingErrorStatusAndMessage(error);
      return settingResponse(res, validationError);
    }

    const result = await getBookedTimesByDateService(data.bookingDate);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch booked car wash times",
      error: error.message,
    });
  }
};

const getAllCarWashBookingsController = async (_req, res) => {
  try {
    const result = await getAllCarWashBookingsService();
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch car wash bookings",
      error: error.message,
    });
  }
};

const deleteCarWashBookingController = async (req, res) => {
  try {
    const result = await deleteCarWashBookingService(req.params.id);
    res.status(result.status).json(result);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid car wash booking ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete car wash booking",
      error: error.message,
    });
  }
};

export {
  createCarWashBookingController,
  getBookedTimesByDateController,
  getAllCarWashBookingsController,
  deleteCarWashBookingController,
};
