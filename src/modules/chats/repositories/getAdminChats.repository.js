import Chat from '../models/chat.model.js';

const getAdminChatsRepository = async ({ inquiryType, page = 1, limit = 20 }) => {
  const filter = { isActive: true };
  if (inquiryType) filter.inquiryType = inquiryType;

  const skip = (page - 1) * limit;

  const [chats, total] = await Promise.all([
    Chat.find(filter)
      .sort({ lastMessageAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Chat.countDocuments(filter),
  ]);

  return { chats, total };
};

const getUserChatsRepository = async ({ userId, inquiryType, page = 1, limit = 20 }) => {
  const filter = {
    isActive: true,
    'user.id': userId,
  };

  if (inquiryType) filter.inquiryType = inquiryType;

  const skip = (page - 1) * limit;

  const [chats, total] = await Promise.all([
    Chat.find(filter)
      .sort({ lastMessageAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Chat.countDocuments(filter),
  ]);

  return { chats, total };
};

export { getAdminChatsRepository, getUserChatsRepository };
