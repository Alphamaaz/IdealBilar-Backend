// Internal modules
import RentACarBooking from "../models/rentACarBookingInquery.model.js";
const updateRentACarDataRepository = async (id, data) => {
  try {
    const updatedBooking = await RentACarBooking.findByIdAndUpdate(id, data, { new: true })
      .populate("userId", "name email role")
      .populate("carId", "make model year title thumbnail");
    return updatedBooking;
  } catch (err) {
    throw err;
  }
};

//export
export { updateRentACarDataRepository };
