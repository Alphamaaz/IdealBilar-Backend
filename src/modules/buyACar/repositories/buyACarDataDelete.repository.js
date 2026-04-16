// External modules

// Internal modules
import { BuyACar } from "../models/buyACar.model.js"
const buyACarDataDeleteRepository = async (buyACarId) => {
    try {
        const result = await BuyACar.findByIdAndDelete(buyACarId,{returnDocument: true});
        return result;
    } catch (error) {
        throw error;
    }
}

//exports
export {
    buyACarDataDeleteRepository
}