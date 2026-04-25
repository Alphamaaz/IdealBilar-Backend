import {
  createCarWashBookingRepository,
  deleteCarWashBookingRepository,
  findBookedCarWashSlotRepository,
  getAllCarWashBookingsRepository,
  getBookedTimesByDateRepository,
} from "../repositories/carWashBooking.repository.js";

const createCarWashBookingService = async (bookingData) => {
  const existingSlot = await findBookedCarWashSlotRepository({
    bookingDate: bookingData.bookingDate,
    bookingTime: bookingData.bookingTime,
  });

  if (existingSlot) {
    return {
      success: false,
      status: 409,
      message: `The ${bookingData.bookingTime} slot on ${bookingData.bookingDate.toISOString().split("T")[0]} is already booked. Please select another time.`,
    };
  }

  const result = await createCarWashBookingRepository(bookingData);

  return {
    success: true,
    status: 201,
    message: "Car wash booking created successfully",
    data: result,
  };
};

const getBookedTimesByDateService = async (bookingDate) => {
  const result = await getBookedTimesByDateRepository(bookingDate);
  return {
    success: true,
    status: 200,
    message: "Booked car wash times fetched successfully",
    data: result,
  };
};

const getAllCarWashBookingsService = async () => {
  const result = await getAllCarWashBookingsRepository();
  return {
    success: true,
    status: 200,
    message: "Car wash bookings fetched successfully",
    data: result,
  };
};

const deleteCarWashBookingService = async (bookingId) => {
  const result = await deleteCarWashBookingRepository(bookingId);

  if (!result) {
    return {
      success: false,
      status: 404,
      message: "Car wash booking not found",
    };
  }

  return {
    success: true,
    status: 200,
    message: "Car wash booking deleted successfully",
  };
};

export {
  createCarWashBookingService,
  getBookedTimesByDateService,
  getAllCarWashBookingsService,
  deleteCarWashBookingService,
};
