//Internal modules
import { rentACarDataForAdminDashboard } from "../repositories/fetchingDataOfRentACarForAdminDashboardInquiry.respository.js";

const fetchingDataForAdminDashboardOfRentACarService = async () => {
    try{
       const result = await rentACarDataForAdminDashboard();
       return result;
    }catch(err){
        throw err;
    }
}

//export
export {
    fetchingDataForAdminDashboardOfRentACarService
}