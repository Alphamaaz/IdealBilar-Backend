import Chat from '../models/chat.model.js';
import Message from '../models/chatMessage.model.js';

const markMessagesReadRepository = async (chatId, userId, userType) => {
  try {
    console.log('markMessagesReadRepository called:', { chatId, userId, userType });

    const messageFilter =
      userType === 'admin'
        ? {
            chatId,
            'receiver.type': 'admin',
            status: { $ne: 'read' },
          }
        : {
            chatId,
            'receiver.id': userId,
            status: { $ne: 'read' },
          };

    const unreadMessages = await Message.countDocuments(messageFilter);

    console.log(`Found ${unreadMessages} unread messages for receiver ${userId} in chat ${chatId}`);

    const updateResult = await Message.updateMany(
      messageFilter,
      { status: 'read', readAt: new Date() }
    );

    console.log('Message update result:', updateResult);

    const counterField = userType === 'admin' ? 'adminUnreadCount' : 'userUnreadCount';
    console.log(`Resetting ${counterField} to 0`);

    const chatUpdateResult = await Chat.findByIdAndUpdate(
      chatId, 
      { $set: { [counterField]: 0 } },
      { returnDocument: 'after' }
    );

    console.log('Chat update result:', chatUpdateResult);

    return {
      unreadMessagesMarkedAsRead: unreadMessages,
      chatUpdateResult
    };
  } catch (error) {
    console.error('markMessagesReadRepository error:', error);
    throw error;
  }
};

export { markMessagesReadRepository };
