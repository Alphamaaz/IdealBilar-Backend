// External modules
import { BuyACar } from "../models/buyACar.model.js"

// Internal modules

const buyACarFetchingDataRepository = async () => {
    try {
        const result = await BuyACar
        .find();
        return result;
    } catch (error) {
        throw error;
    }
}

//export
export {
    buyACarFetchingDataRepository
}