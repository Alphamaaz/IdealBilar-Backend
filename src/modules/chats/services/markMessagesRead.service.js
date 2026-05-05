import { markMessagesReadRepository } from '../repositories/markMessagesRead.repository.js';

const markMessagesReadService = async (chatId, userId, userType) => {
  await markMessagesReadRepository(chatId, userId, userType);
};

export { markMessagesReadService };
