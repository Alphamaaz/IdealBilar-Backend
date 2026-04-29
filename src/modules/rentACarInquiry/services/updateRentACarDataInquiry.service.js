// External modules

import { updateRentACarDataRepository } from "../repositories/rentACarEditeDateInquiry.repository.js";

// Internal modules

const updateRentACarService = async (id, data) => {
  try {
    console.log("We are in the update rent a car service");
    return await updateRentACarDataRepository(id, data);
  } catch (err) {
    throw err;
  }
};


//export

export{
    updateRentACarService
}