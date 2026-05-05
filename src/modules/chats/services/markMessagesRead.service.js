import { markMessagesReadRepository } from '../repositories/markMessagesRead.repository.js';

const markMessagesReadService = async (chatId, userId, userType) => {
  console.log('markMessagesReadService called with:', { chatId, userId, userType });
  const result = await markMessagesReadRepository(chatId, userId, userType);
  console.log('markMessagesReadService result:', result);
  return result;
};

export { markMessagesReadService };
