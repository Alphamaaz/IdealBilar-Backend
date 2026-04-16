//External modules

//Internal modules
import { BuyACar } from "../models/buyACar.model.js";
const buyACarRepository = async (buyACarData) => {
    try{
        const result = await BuyACar.create(buyACarData);
        return result;
    }catch(err){
        throw err;
    }
}

//export 
export {
    buyACarRepository
}