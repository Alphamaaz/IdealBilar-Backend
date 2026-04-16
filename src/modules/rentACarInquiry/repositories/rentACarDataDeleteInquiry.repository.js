//Internal modules
import RentACarBooking from "../models/rentACarBookingInquery.model.js";

const rentACarDataDeleteRepository = async (rentACarId) => {
    try{
        const result = await RentACarBooking.findByIdAndDelete(rentACarId);
        return result;

    }catch(err){
        throw err
    }
}

//exports

export {
    rentACarDataDeleteRepository
}
