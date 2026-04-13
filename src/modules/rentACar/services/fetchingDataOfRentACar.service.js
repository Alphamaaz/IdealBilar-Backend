//External modules

import { rentACarDataForAdminDashboard } from "../repositories/fetchingDataOfRentACarForAdminDashboard.respository.js";

//Internal modules

const fetchingDataForAdminDashboardOfRentACarService = async () => {
    try{
     
        console.log("We are in the fetching data service");
        
        rentACarDataForAdminDashboard();

    }catch(err){
        throw err;
    }
}

//export
export {
    fetchingDataForAdminDashboardOfRentACarService
}