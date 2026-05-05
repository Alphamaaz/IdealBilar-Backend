// Internal modules

import RentalCar from "../../rentalCar/model/rentalCar.model.js";
import {
  findOverlappingRentACarBooking,
  saveRentACarData,
} from "../repositories/rentACarInquiry.repository.js";

const formatDate = (date) => new Date(date).toISOString().split("T")[0];

const rentACarService = async (rentACarData) => {
  console.log("Check the rentACarID ", rentACarData);
  
    try{
      const rentalCar = await RentalCar.findById(rentACarData.carId);
      console.log("Check the rental car ", rentalCar);
      

      if (!rentalCar) {
        return {
          success: false,
          status: 404,
          message: "Rental car not found.",
        };
      }

      if (["booked", "rented", "sold", "maintenance"].includes(rentalCar.status)) {
        return {
          success: false,
          status: 409,
          message: "This car is currently unavailable for booking. Please choose another car or different dates.",
        };
      }

      const existingBooking = await findOverlappingRentACarBooking({
        carId: rentACarData.carId,
        pickupDate: rentACarData.pickupDate,
        returnDate: rentACarData.returnDate,
      });

      if (existingBooking) {
        return {
          success: false,
          status: 409,
          message: `This car is already booked from ${formatDate(existingBooking.pickupDate)} to ${formatDate(existingBooking.returnDate)}. Please choose another day or different dates.`,
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
