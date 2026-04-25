//External modules

//Internal modules
import { findChatsRepository } from "../repositories/sendMessage.repository.js";

const findChatsService = async () => {
  try {
    const activeChats = await findChatsRepository();
    const chatRooms = activeChats.map((chat) => ({
      chatId: chat._id,
      userId: chat.user?.id,
      userName: chat.user?.name,
      lastMessage: chat.lastMessage,
      lastMessageAt: chat.lastMessageAt,
    }));
    return chatRooms;
  } catch (error) {
    throw error;
  }
};

//external
export { findChatsService };
