//External modules

import { buyACarDataValidation } from "../validations/buyACar.validation.js";

//Internal modules
// import { buyACarService } from "../services/buyACar.service.js";
import settingErrorStatusAndMessage from "../../../shared/utils/settingErrorStatusAndMessage.js";
import settingResponse from "../../../shared/utils/settingResponse.js";
const buyACarController = async (req, res) => {
    try{
       const {success, data, error } = buyACarDataValidation(req.body);
       if(!success){
        const validationError = settingErrorStatusAndMessage(error);
        return settingResponse(res, validationError);
       }
       res.status(200).json({
        success: true,
        message: "Reached to teh buy a car controller successfully!",
        data: req.body   
    })

    }catch(err){
        throw err;
    }
}

//export

export {
    buyACarController
}