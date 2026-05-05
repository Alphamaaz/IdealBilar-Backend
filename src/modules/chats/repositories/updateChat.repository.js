//External modules

//Internal modules
import Chat from '../models/chat.model.js';
const upateChatRepository = async (finalChatId, message, senderInfo) => {
    try {
      const updateData = {
        lastMessage: message,
        lastMessageAt: new Date(),
        lastMessageSender: senderInfo.type
      };

      if (senderInfo?.type === 'admin' && senderInfo.id) {
        updateData.admin = {
          id: senderInfo.id,
          name: senderInfo.name || 'Admin',
          assignedAt: new Date(),
        };
      }

      await Chat.findByIdAndUpdate(finalChatId, updateData);
    } catch (error) {
        throw error;
    }
}

//export
export {
    upateChatRepository
}
