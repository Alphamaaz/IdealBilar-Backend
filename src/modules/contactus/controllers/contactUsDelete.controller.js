// Internal modules
import { success } from "zod";
import settingErrorStatusAndMessage from "../../../shared/utils/settingErrorStatusAndMessage.js";
import { contactUsDeleteService } from "../services/contactUsDelete.service.js";
const contactUsDeleteController = async (req, res) => {
    try{
         const result = await contactUsDeleteService(req.params.userId);
         
         if(!result){
            return res.status(404).json({
                success: false,
                message: "Record is not found!"
            })
         }

        res.status(200).json({
            success: true,
            message: `Contact us of ${result.firstName}, and his/her complaint about ${result.subject} delete successfully!`,
            result
        })
    }catch(err){
        throw err;
    }
}

//export

export {
    contactUsDeleteController
}