//External modules

//Internal modules
import Chat from '../models/chat.model.js';
const upateChatRepository = async (finalChatId, message, senderInfo) => {
    try {
        // Update chat's last message
      await Chat.findByIdAndUpdate(finalChatId, {
        lastMessage: message,
        lastMessageAt: new Date(),
        lastMessageSender: senderInfo.type
      });
    } catch (error) {
        throw error;
    }
}

//export
export {
    upateChatRepository
}