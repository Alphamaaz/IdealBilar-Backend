// External modules

import RentACarBooking from "../models/rentACarBookingInquery.model.js";

// Internal modules

const rentACarDataForAdminDashboard = async () => {
    try{
       const result = await RentACarBooking.find()
         .populate("userId", "name email  role")
         .populate("carId", "make model year title thumbnail ")
         .sort({ createdAt: -1 });
               
         return result;
    }catch(err){
        throw err;
    }
}

//export
export {
    rentACarDataForAdminDashboard
}
