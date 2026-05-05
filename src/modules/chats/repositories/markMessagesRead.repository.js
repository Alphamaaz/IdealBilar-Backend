import Chat from '../models/chat.model.js';
import Message from '../models/chatMessage.model.js';

const markMessagesReadRepository = async (chatId, userId, userType) => {
  await Message.updateMany(
    { chatId, 'receiver.id': userId, status: { $ne: 'read' } },
    { status: 'read', readAt: new Date() }
  );

  const counterField = userType === 'admin' ? 'adminUnreadCount' : 'userUnreadCount';
  await Chat.findByIdAndUpdate(chatId, { [counterField]: 0 });
};

export { markMessagesReadRepository };
