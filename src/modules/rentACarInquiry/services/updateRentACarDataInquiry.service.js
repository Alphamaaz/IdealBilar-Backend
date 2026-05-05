// External modules

import { updateRentACarDataRepository } from "../repositories/rentACarEditeDateInquiry.repository.js";

// Internal modules

const updateRentACarService = async (id, data) => {
  try {
    console.log("We are in the update rent a car service");
    console.log("Received data:", data);
    
    // Process dates to ensure they are proper Date objects
    const processedData = { ...data };
    
    if (processedData.pickupDate) {
      processedData.pickupDate = new Date(processedData.pickupDate);
    }
    
    if (processedData.returnDate) {
      processedData.returnDate = new Date(processedData.returnDate);
    }
    
    console.log("Processed data before update:", processedData);
    
    const result = await updateRentACarDataRepository(id, processedData);
    
    console.log("Update result:", result);
    return result;
  } catch (err) {
    throw err;
  }
};


//export

export{
    updateRentACarService
}