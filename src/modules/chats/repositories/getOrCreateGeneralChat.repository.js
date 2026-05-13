import Chat from '../models/chat.model.js';
import Message from '../models/chatMessage.model.js';
import User from '../../user/models/user.model.js';

const buildGeneralChatId = (userId) => `general-${userId}`;

const getOrCreateGeneralChatRepository = async (userId) => {
  const user = await User.findById(userId).select('name email').lean();

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  const chatId = buildGeneralChatId(userId);

  const chat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $setOnInsert: {
        _id: chatId,
        inquiryType: 'general',
        inquiryId: chatId,
        user: {
          id: userId,
          name: user.name,
          email: user.email,
        },
        status: 'active',
        chatType: 'one-to-one',
        isActive: true,
      },
    },
    { upsert: true, returnDocument: 'after' },
  ).lean();

  const messages = await Message.find({ chatId })
    .sort({ createdAt: 1 })
    .limit(50)
    .select('_id sender receiver message status createdAt')
    .lean();

  return { chat, messages };
};

export { getOrCreateGeneralChatRepository, buildGeneralChatId };
