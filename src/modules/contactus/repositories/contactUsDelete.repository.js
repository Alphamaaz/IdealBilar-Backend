//Internal modules
import { ContactUsModel } from "../models/contactus.model";
const contactUsDelete = async (UserId) => {
    try{
        const  result = await ContactUsModel.deleteOne({_id: UserId})
        return result;
    }catch(err){
        throw err;
    }
}


//export
export {
    contactUsDelete,
}