//External modules

//Internal modules
import { BuyACar } from "../models/buyACar.model.js";
import { notificationServices } from "../../notification/services/notification.service.js";

const buyACarRepository = async (buyACarData) => {
    try{
        const result = (await BuyACar.create(buyACarData)).populate("userId", "name email -_id");
        await notificationServices({
            name: buyACarData.name,
            type: "Buy Car",
            message: `${buyACarData.name} has inquired about buying a car`,
            model: buyACarData.subject,
            referenceId: result._id,
        });
        return result;
    }catch(err){
        throw err;
    }
}

//export 
export {
    buyACarRepository
}