//External modules

//Internal modules
import Chat from '../models/chat.model.js';
const getChatHistoryRepository = async (chatId) => {
    try {
        const messages = await Message.find({ chatId: chatId })
        .sort({ createdAt: 1 })
        .limit(limit)
        .lean();

        return messages;
    } catch (error) {
        throw error;
    }
}

//export
export {
    getChatHistoryRepository
}