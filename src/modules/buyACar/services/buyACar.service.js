//External modules

import { sendAdminInquiryEmail } from "../../../shared/utils/sendEmailNotificationToAdminOnInquiry.js";
import { buyACarRepository } from "../repositories/buyACar.repository.js";

//Internal modules

const buyACarService = async (buyACarData) => {
    try{
     const result = await buyACarRepository(buyACarData);
     const dataForEmailNotification = {
        name: result?.userId?.name,
        email: result?.userId?.email,
        message: "New Buy a car inquiry",
        Inquiry: "Buy a car"
     }

     //send eamil notification to admin
     await sendAdminInquiryEmail(dataForEmailNotification);
     return result;
    }catch(err){
        throw err;
    }
}

//export
export {
    buyACarService
}