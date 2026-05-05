//External modules

//Internal modules
import Message from '../models/chatMessage.model.js';
const saveMessageInDBRepository = async (ids, currentUser, chat, userType, message) => {
    try {
      let senderInfo;
      let receiverInfo;
      
      if (ids.AdminId || userType === 'admin') {
        const adminId = ids.AdminId || ids.userId || currentUser.id || 'admin_default';
        senderInfo = {
          id: adminId,
          type: 'admin',
          name: currentUser.name || 'Admin'
        };
        receiverInfo = {
          id: chat.user?.id || ids.clientUserId || ids.socket.id,
          type: 'user',
          name: chat.user?.name || 'User'
        };
      } else {
        senderInfo = {
          id: ids.clientUserId || ids.userId || ids.socket.id,
          type: 'user',
          name: currentUser.name || 'User'
        };
        receiverInfo = {
          id: chat.admin?.id || ids.AdminId || 'admin_default',
          type: 'admin',
          name: chat.admin?.name || 'Admin'
        };
      }
      
      const messageData = new Message({
        chatId: ids.finalChatId,
        sender: senderInfo,
        receiver: receiverInfo,
        message: message,
        status: 'sent'
      });
      
      const savedMessage = await messageData.save();
     
      return savedMessage;
    } catch (error) {
        throw error;
    }
}

//export
export {
    saveMessageInDBRepository
}
