//External modules

import { updateRentACarService } from "../services/updateRentACarDataInquiry.service.js";

//Internal modules

const rentACarEditeController = async (req, res) =>{
    try{
        updateRentACarService("hksjdksjd");
        res.status(200).json({
            success: true,
            message: "Reached to the rent a car edite controller!"
        })
    }catch(err){
        throw err;
    }
}

//exports
export {
    rentACarEditeController
}