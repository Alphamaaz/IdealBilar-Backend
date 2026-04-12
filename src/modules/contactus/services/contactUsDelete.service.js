// Internal modules
import { contactUsDelete } from "../repositories/contactUsDelete.repository.js";
const contactUsDeleteService = async (contactUsiD) => {
    try{
         const result = await contactUsDelete(contactUsiD);
         return result;
    }catch(err){
        throw err;
    }
}

//export
export{
    contactUsDeleteService
}