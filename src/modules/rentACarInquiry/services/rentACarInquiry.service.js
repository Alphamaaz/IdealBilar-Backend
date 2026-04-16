// Internal modules

import {
  findOverlappingRentACarBooking,
  saveRentACarData,
} from "../repositories/rentACarInquiry.repository.js";

const rentACarService = async (rentACarData) => {
    try{
      const existingBooking = await findOverlappingRentACarBooking({
        carId: rentACarData.carId,
        pickupDate: rentACarData.pickupDate,
        returnDate: rentACarData.returnDate,
      });

      if (existingBooking) {
        return {
          success: false,
          status: 409,
          message: `This car is already booked from ${existingBooking.pickupDate.toISOString().split("T")[0]} to ${existingBooking.returnDate.toISOString().split("T")[0]}. Please choose different dates.`,
        };
      }

      const result = await saveRentACarData(rentACarData);
      return {
        success: true,
        status: 201,
        message: "Rent a car inquiry created successfully",
        data: result,
      };
    }catch(err){
        return {
          success: false,
          status: 500,
          message: "Failed to create rent a car inquiry",
          error: err.message,
        };
    }
}

// export
export {
    rentACarService
}
