// Internal modules

import { ContactUsModel } from "../models/contactus.model.js";
const contactusDataForDashboard = async () => {
    try{
     const result = await ContactUsModel.find().sort({ createdAt: -1 });
     return result;
    }catch(err){
        throw err;
    }
}

//export
export default contactusDataForDashboard;