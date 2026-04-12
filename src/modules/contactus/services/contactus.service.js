// External modules

// Internal modules

import settingErrorStatusAndMessage from "../../../shared/utils/settingErrorStatusAndMessage.js";
import { contactusValidation } from "../validations/contactus.validations.js";
import { contactusDataStoringFunction } from "../repositories/contactus.repository.js";

// contact us service
const contactusService = async (contactUsData) => {
    try{
        const {success, data, error } = contactusValidation(contactUsData);

        if(!success){
          const validationError = settingErrorStatusAndMessage(error);
          return validationError;
        }
        
        const result = await contactusDataStoringFunction(data);
        return result;
        
    }catch(err){
        throw err;
    }
}


//exports
export {
    contactusService
};