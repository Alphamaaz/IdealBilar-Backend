import Chat from '../models/chat.model.js';

const createChatForInquiryRepository = async ({ inquiryId, inquiryType, user }) => {
  const chatId = inquiryId.toString();

  const existing = await Chat.findById(chatId);
  if (existing) return existing;

  const chat = await Chat.create({
    _id: chatId,
    inquiryType,
    inquiryId: chatId,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    status: 'active',
  });

  return chat;
};

export { createChatForInquiryRepository };
