import { messageDataService } from "../services/message.service.js";

const messageDataController = async (req, res) => {
    try {
        const result = await messageDataService();
        res.status(200).json({
            success: true,
            message: "Fetched all messages successfully!",
            data: result
        })
    } catch (error) {
        throw error;
    }
}

export {
    messageDataController
}