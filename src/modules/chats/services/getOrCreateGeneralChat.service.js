import { getOrCreateGeneralChatRepository } from '../repositories/getOrCreateGeneralChat.repository.js';

const formatMessages = (messages) =>
  messages.map((m) => ({
    id: m._id,
    message: m.message,
    sender: {
      id: m.sender?.id,
      name: m.sender?.name,
      type: m.sender?.type,
    },
    receiver: {
      id: m.receiver?.id,
      name: m.receiver?.name,
      type: m.receiver?.type,
    },
    status: m.status,
    sentAt: m.createdAt,
  }));

const getOrCreateGeneralChatService = async (userId) => {
  const { chat, messages } = await getOrCreateGeneralChatRepository(userId);

  return {
    chatId: chat._id,
    inquiryType: chat.inquiryType,
    status: chat.status,
    unreadCount: chat.userUnreadCount,
    user: chat.user,
    lastMessage: chat.lastMessage || null,
    lastMessageAt: chat.lastMessageAt || null,
    inquiry: {
      id: chat._id,
      type: 'General',
      title: 'General Support',
    },
    messages: formatMessages(messages),
  };
};

export { getOrCreateGeneralChatService };
