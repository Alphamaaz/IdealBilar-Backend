//External modules

//Internal modules
import { getChatHistoryRepository } from "../repositories/getChatHistory.repository.js";
const getActiveChatsService = async (chatId) => {
    try {
        const messages = getChatHistoryRepository(chatId);
        return messages;
    } catch (error) {
        throw error;
    }
}

//export
export {
    getActiveChatsService
}