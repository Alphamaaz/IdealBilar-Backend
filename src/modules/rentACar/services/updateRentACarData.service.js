// External modules

import { updateRentACarDataRepository } from "../repositories/rentACarEditeDate.repository.js";

// Internal modules

const updateRentACarService = async (rentACarData) => {
    try{
      console.log("We are in the update rent a car service");
      updateRentACarDataRepository(rentACarData);
    }catch(err){
        throw err;
    }
}


//export

export{
    updateRentACarService
}