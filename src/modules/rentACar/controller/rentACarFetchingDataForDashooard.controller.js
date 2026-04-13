//External modules

import { fetchingDataForAdminDashboardOfRentACarService } from "../services/fetchingDataOfRentACar.service.js";

//Internal modules

const rentACarFetchingDataForAdminDashboardController = async (req, res) => {
    try{
        fetchingDataForAdminDashboardOfRentACarService();
       res.status(200).json({
        success: true,
        message: "Reached to the rent a car fetching data for admin dashboard controller!"
       })
    }catch(err){
        throw err;
    }
}

//export
export {
    rentACarFetchingDataForAdminDashboardController
}