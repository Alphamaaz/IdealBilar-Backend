// Internal modules

import { saveRentACarData } from "../repositories/rentACarInquiry.repository.js";

const rentACarService = async (rentACarData) => {
    try{
      const result = await saveRentACarData(rentACarData);
      return result;
    }catch(err){
        throw err
    }
}

// export
export {
    rentACarService
}