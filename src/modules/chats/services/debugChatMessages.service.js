import Message from '../models/chatMessage.model.js';
import Chat from '../models/chat.model.js';

const debugChatMessagesService = async (chatId, userId) => {
  try {
    const chat = await Chat.findById(chatId);
    
    // Get all messages in this chat
    const allMessages = await Message.find({ chatId }).sort({ createdAt: -1 });

    // Get unread messages for this user
    const unreadMessages = await Message.find({
      chatId,
      'receiver.id': userId,
      status: { $ne: 'read' }
    }).sort({ createdAt: -1 });

    return {
      chatInfo: {
        _id: chat._id,
        inquiryType: chat.inquiryType,
        adminUnreadCount: chat.adminUnreadCount,
        userUnreadCount: chat.userUnreadCount,
        user: chat.user
      },
      allMessagesCount: allMessages.length,
      unreadMessagesForUser: unreadMessages.length,
      allMessages: allMessages.map(m => ({
        _id: m._id,
        sender: m.sender,
        receiver: m.receiver,
        message: m.message,
        status: m.status,
        createdAt: m.createdAt
      })),
      unreadMessages: unreadMessages.map(m => ({
        _id: m._id,
        sender: m.sender,
        receiver: m.receiver,
        message: m.message,
        status: m.status,
        createdAt: m.createdAt
      }))
    };
  } catch (error) {
    throw error;
  }
};

export { debugChatMessagesService };
