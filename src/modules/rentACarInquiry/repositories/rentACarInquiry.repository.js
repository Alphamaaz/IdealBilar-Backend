// External modules

// Internal modules
import RentACarBooking from "../models/rentACarBookingInquery.model.js"
const saveRentACarData = async (rentACarData) => {
    try{
      const result = await RentACarBooking.create(rentACarData);
      return result;
    }catch(err){
        throw err
    }
}

//export

export {
    saveRentACarData
}