// External modules

import { updateRentACarDataRepository } from "../repositories/rentACarEditeDateInquiry.repository.js";

// Internal modules

const updateRentACarService = async (rentACarId, rentACarData) => {
    try{
      console.log("We are in the update rent a car service");
      const updatedRentACar = await updateRentACarDataRepository(rentACarId, rentACarData);
      return {
        success: true,
        status: 200,
        message: "Rent a car data updated successfully",
        data: updatedRentACar
      };
    }catch(err){
        throw err;
    }
}


//export

export{
    updateRentACarService
}