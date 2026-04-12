//Internal modules
import { ContactUsModel } from "../models/contactus.model.js";
const contactUsDelete = async (UserId) => {
    try{
        const  result = await ContactUsModel.findByIdAndDelete({_id: UserId})
        return result;
    }catch(err){
        throw err;
    }
}

//export
export {
    contactUsDelete,
}