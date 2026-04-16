// External modules

// Internal modules
import { buyACarFetchingDataRepository } from "../repositories/buyACarFetchingData.repository.js";
const buyACarFetchingDataForAdminPanel = async () =>{
    try {
        const result = await buyACarFetchingDataRepository();
        return result;
    } catch (error) {
        throw error;
    }
}

//exports
export {
    buyACarFetchingDataForAdminPanel
}