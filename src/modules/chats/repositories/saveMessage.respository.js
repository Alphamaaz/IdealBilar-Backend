//External modules

//Internal modules
import Message from '../models/chatMessage.model.js';
const saveMessageInDBRepository = async (ids, currentUser, chat, userType, message) => {
    try {
        
         // Determine sender info
      let senderInfo;
      let receiverInfo;
      
      // Check if sender is admin (has AdminId) or user
      if (ids.AdminId || userType === 'admin') {
        // Admin sending message
        const adminId = ids.AdminId || userId;
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
        // User sending message
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
      
      // Save message to database
      const messageData = new Message({
        chatId: ids.finalChatId,
        sender: senderInfo,
        receiver: receiverInfo,
        message: message,
        status: 'sent'
      });

    //   console.log("We are in the save message in DB Repository check sender info ", senderInfo );
    //   console.log("We are in the save message in DB Repository check reciver info ", receiverInfo);
      
      const savedMessage = await messageData.save();
      
    //   console.log("Message saved to DB:", savedMessage._id);
     
      return savedMessage;
    } catch (error) {
        throw error;
    }
}

//export
export {
    saveMessageInDBRepository
}