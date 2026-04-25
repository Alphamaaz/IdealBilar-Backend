// Internal modules
import { ContactUsModel } from "../models/contactus.model.js";
import { notificationServices } from "../../notification/services/notification.service.js";

// contact us service
const contactusDataStoringFunction = async (contactUsData) => {
    try{
        const contactUsRecord = new ContactUsModel(contactUsData);
        const savedRecord = await contactUsRecord.save();
        await notificationServices({
            name: contactUsData.firstName,
            type: "General",
            message: `${contactUsData.firstName} ${contactUsData.lastName} has sent a general inquiry`,
            referenceId: savedRecord._id,
        });
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