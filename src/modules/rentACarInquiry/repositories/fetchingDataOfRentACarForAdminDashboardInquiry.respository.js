// External modules

import RentACarBooking from "../models/rentACarBookingInquery.model.js";

// Internal modules

const rentACarDataForAdminDashboard = async () => {
    try{
       const result = await RentACarBooking.find();
       return result;
    }catch(err){
        throw err;
    }
}

//export
export {
    rentACarDataForAdminDashboard
}