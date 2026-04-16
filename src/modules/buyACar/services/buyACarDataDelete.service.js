// External modules


// Internal modules
import { buyACarDataDeleteRepository } from "../repositories/buyACarDataDelete.repository.js"
const buyACarDataDeleteService = async (buyACarId) => {
    try {
        const result = await buyACarDataDeleteRepository(buyACarId);
        return result;
    } catch (error) {
        throw error;
    }
}

//export
export {
    buyACarDataDeleteService
}