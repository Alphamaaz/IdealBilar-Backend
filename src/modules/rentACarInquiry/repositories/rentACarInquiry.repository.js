// External modules

// Internal modules
import RentACarBooking from "../models/rentACarBookingInquery.model.js"

const findOverlappingRentACarBooking = async ({ carId, pickupDate, returnDate }) => {
    try {
      const existingBooking = await RentACarBooking.findOne({
        carId,
        pickupDate: { $lt: returnDate },
        returnDate: { $gt: pickupDate },
      });

      return existingBooking;
    } catch (err) {
        throw err
    }
}

const saveRentACarData = async (rentACarData) => {
    try{
      const result = await RentACarBooking.create(rentACarData);
      const populatedResult = await RentACarBooking.findById(result._id)
        .populate("userId", "name email role")
        .populate("carId", "make model year title thumbnail ");
      return populatedResult;
    }catch(err){
        throw err
    }
}

//export

export {
    findOverlappingRentACarBooking,
    saveRentACarData
}
