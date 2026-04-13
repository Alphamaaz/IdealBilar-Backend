//External modules

import { buyACarRepository } from "../repositories/buyACar.repository.js";

//Internal modules

const buyACarService = async (buyACarData) => {
    try{
      console.log("We are in the buy a car service");
      buyACarRepository(buyACarData);
      
    }catch(err){
        throw err;
    }
}

//export
export {
    buyACarService
}