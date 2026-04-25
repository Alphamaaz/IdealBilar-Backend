import Chat from '../../chats/models/chat.model.js'
const chatDataRepository = async () => {
    try {
        const result = await Chat.find();
        return result;
    } catch (error) {
        throw error;
    }
}

export {
    chatDataRepository
}