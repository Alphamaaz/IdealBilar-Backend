//External modules

//Internal modules
import Message from '../models/chatMessage.model.js';
const joinSpecificChatRepository = async (chatId) => {
    try {
        const messages = await Message.find({ chatId: chatId })
                .sort({ createdAt: 1 })
                .limit(50)
                .lean();

            return messages;
    } catch (error) {
        throw error;
    }
}

//export 
export {
    joinSpecificChatRepository
}