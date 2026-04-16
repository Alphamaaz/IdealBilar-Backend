//External modules

import { buyACarRepository } from "../repositories/buyACar.repository.js";

//Internal modules

const buyACarService = async (buyACarData) => {
    try{
     const result = await buyACarRepository(buyACarData);
     return result;
    }catch(err){
        throw err;
    }
}

//export
export {
    buyACarService
}