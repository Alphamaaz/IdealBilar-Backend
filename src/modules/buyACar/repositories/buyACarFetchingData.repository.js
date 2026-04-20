// External modules
import { BuyACar } from "../models/buyACar.model.js"

// Internal modules

const buyACarFetchingDataRepository = async () => {
    try {
        const result = await BuyACar
        .find().populate("userId", "name email");
        return result;
    } catch (error) {
        throw error;
    }
}

//export
export {
    buyACarFetchingDataRepository
}