import Chat from '../models/chat.model.js';
import Message from '../models/chatMessage.model.js';

const debugUnreadCountService = async (userId, userType) => {
  try {
    let chats = [];
    
    if (userType === 'admin') {
      chats = await Chat.find().select('_id inquiryType adminUnreadCount userUnreadCount user').lean();
    } else {
      chats = await Chat.find({ 'user.id': userId }).select('_id inquiryType adminUnreadCount userUnreadCount user').lean();
    }

    let detailedBreakdown = [];
    let totalFromDB = 0;

    for (const chat of chats) {
      const counterField = userType === 'admin' ? 'adminUnreadCount' : 'userUnreadCount';
      const storedCount = chat[counterField];

      // Count actual unread messages in this chat
      const actualUnreadCount = await Message.countDocuments({
        chatId: chat._id,
        'receiver.id': userId,
        status: { $ne: 'read' }
      });

      detailedBreakdown.push({
        chatId: chat._id,
        inquiryType: chat.inquiryType,
        storedCount: storedCount,
        actualUnreadMessages: actualUnreadCount,
        mismatch: storedCount !== actualUnreadMessages,
      });

      totalFromDB += storedCount;
    }

    return {
      totalFromDB,
      breakdown: detailedBreakdown,
      mismatchesFound: detailedBreakdown.filter(item => item.mismatch)
    };
  } catch (error) {
    throw error;
  }
};

export { debugUnreadCountService };
