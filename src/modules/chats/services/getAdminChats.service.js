import { getAdminChatsRepository, getUserChatsRepository } from '../repositories/getAdminChats.repository.js';

const getAdminChatsService = async (filters) => {
  const result = await getAdminChatsRepository(filters);
  return result;
};

const getUserChatsService = async (filters) => {
  const result = await getUserChatsRepository(filters);
  return result;
};

export { getAdminChatsService, getUserChatsService };
