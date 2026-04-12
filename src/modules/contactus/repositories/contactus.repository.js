// External modules

// Internal modules
import { ContactUsModel } from "../models/contactus.model.js";

// contact us service
const contactusDataStoringFunction = async (contactUsData) => {
    try{
        const contactUsRecord = new ContactUsModel(contactUsData);
        const savedRecord = await contactUsRecord.save();
        return savedRecord;
    }catch(err){
        if (err.code === 11000) {
            return {
                status: 400,
                message: "Duplicate submission not allowed"
            };
        }
        throw err;
    }
};



//exports
export {
    contactusDataStoringFunction
};