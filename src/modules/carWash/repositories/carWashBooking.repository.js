import CarWashBooking from "../models/carWashBooking.model.js";
import { notificationServices } from "../../notification/services/notification.service.js";

const createCarWashBookingRepository = async (bookingData) => {
  const result = await CarWashBooking.create(bookingData);
  await notificationServices({
    name: bookingData.firstName,
    type: "Car Wash",
    message: `${bookingData.firstName} ${bookingData.lastName} has inquired about Car Wash`,
    model: bookingData.carBrandAndModel,
    referenceId: result._id,
  });
  return result;
};

const findBookedCarWashSlotRepository = async ({ bookingDate, bookingTime }) => {
  const result = await CarWashBooking.findOne({
    bookingDate,
    bookingTime,
    status: { $in: ["pending", "confirmed"] },
  });
  return result;
};

const getBookedTimesByDateRepository = async (bookingDate) => {
  const result = await CarWashBooking.find({
    bookingDate,
    status: { $in: ["pending", "confirmed"] },
  })
    .select("bookingTime estimatedDurationHours status")
    .sort({ bookingTime: 1 });
  return result;
};

const getAllCarWashBookingsRepository = async () => {
  const result = await CarWashBooking.find().sort({ createdAt: -1 });
  return result;
};

const deleteCarWashBookingRepository = async (bookingId) => {
  const result = await CarWashBooking.findByIdAndDelete(bookingId);
  return result;
};

export {
  createCarWashBookingRepository,
  findBookedCarWashSlotRepository,
  getBookedTimesByDateRepository,
  getAllCarWashBookingsRepository,
  deleteCarWashBookingRepository,
};
