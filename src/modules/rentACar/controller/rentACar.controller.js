// Internal modules

import { rentACarService } from "../services/rentACar.service.js"
import { rentACarDataValidationFunction } from "../validations/rentACar.validation.js";

const rentACarController = async (req, res) => {
    try{
        const {success, data, error} = rentACarDataValidationFunction(req.body);
        console.log("Validation is correct ", success);
        console.log("Validation data ", data);
        console.log("Validation error ", error);
        
        // const result = await rentACarService(req.body);

        res.status(200).json({
        success: true,
        message: "We reached to the rentACarController",
        data: req.body
    })
    }catch(err){
        throw err;
    }
}

//exports
export {
    rentACarController
}