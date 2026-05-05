// Internal modules
import RentACarBooking from "../models/rentACarBookingInquery.model.js";

const updateRentACarDataRepository = async (id, data) => {
  try {
    console.log("Repository - Updating with id:", id);
    console.log("Repository - Update data:", data);
    
    const updatedBooking = await RentACarBooking.findByIdAndUpdate(
      id, 
      data, 
      { 
        new: true,
        runValidators: true 
      }
    )
      .populate("userId", "name email role")
      .populate("carId", "make model year title thumbnail");
    
    console.log("Repository - Updated booking:", updatedBooking);
    return updatedBooking;
  } catch (err) {
    console.error("Repository error:", err);
    throw err;
  }
};

//export
export { updateRentACarDataRepository };
