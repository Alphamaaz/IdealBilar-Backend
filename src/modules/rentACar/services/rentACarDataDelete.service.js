//External modules

//Internal modules
import {rentACarDataDeleteRepository } from '../repositories/rentACarDataDelete.repository.js'

const rentACarDataDeleteService = async (rentACarId) => {
    try{

        console.log("We are in the rent a car data delete service");
        rentACarDataDeleteRepository(rentACarId);
        
    }catch(err){
        throw err;
    }
}

//exports

export {
    rentACarDataDeleteService
}