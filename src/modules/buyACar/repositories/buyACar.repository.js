import { BuyACar } from "../models/buyACar.model.js";
import { notificationServices } from "../../notification/services/notification.service.js";
import { createChatForInquiryRepository } from "../../chats/repositories/createChatForInquiry.repository.js";

const buyACarRepository = async (buyACarData) => {
    try {
        const result = await BuyACar.create(buyACarData);
        await result.populate('userId', 'name email');
        await notificationServices({
            name: buyACarData.name,
            type: "Buy Car",
            message: `${buyACarData.name} has inquired about buying a car`,
            model: buyACarData.subject,
            referenceId: result._id,
        });
        await createChatForInquiryRepository({
            inquiryId: result._id,
            inquiryType: 'buyACar',
            user: {
                id: buyACarData.userId,
                name: buyACarData.name,
                email: '',
            },
        });
        return result;
    } catch (err) {
        throw err;
    }
}

//export 
export {
    buyACarRepository
}