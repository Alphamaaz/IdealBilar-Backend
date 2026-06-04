// Internal modules

import settingErrorStatusAndMessage from "../../../shared/utils/settingErrorStatusAndMessage.js";
import { contactusValidation } from "../validations/contactus.validations.js";
import { contactusDataStoringFunction } from "../repositories/contactus.repository.js";
import { sendAdminInquiryEmail } from "../../../shared/utils/sendEmailNotificationToAdminOnInquiry.js";

// contact us service
const contactusService = async (contactUsData) => {
    try{
        const {success, data, error } = contactusValidation(contactUsData);

        if(!success){
          const validationError = settingErrorStatusAndMessage(error);
          return validationError;
        }
        
        const result = await contactusDataStoringFunction(data);

        const dataForEmailNotification = {
            name: result?.firstName + " " + result.lastName,
            email: result.email,
            message: result.message,
            Inquiry: "Contact Us"
        }
        await sendAdminInquiryEmail(dataForEmailNotification);
        
        return result;
        
    }catch(err){
        throw err;
    }
}


//exports
export {
    contactusService
};