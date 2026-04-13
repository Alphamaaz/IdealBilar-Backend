// External modules

import { rentACarDataDeleteService } from "../services/rentACarDataDelete.service.js";

//Internal modules

const rentACarDeleteDataController = async (req, res) => {
    try{

        rentACarDataDeleteService(773974397939493);
       res.status(200).json({
        success: true,
        message: "Reached to the rent a car data controller successfully!"
       })
    }catch(err){
        throw err
    }
};


//exports

export {
    rentACarDeleteDataController
}