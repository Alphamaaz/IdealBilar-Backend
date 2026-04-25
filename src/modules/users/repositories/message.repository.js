import Message from '../../chats/models/chatMessage.model.js';
const messageDataRepository = async () => {
    try {
         const result = await Message.find();
         return result;
    } catch (error) {
        throw error;
    }
}

export {
    messageDataRepository
}
