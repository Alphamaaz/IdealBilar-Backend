//External modules

//Internal modules
import { joinSpecificChatRepository } from "../repositories/joinSpecificChat.repository.js";
const joinSpecificChatService = async (chatId) => {
  try {
      const result = await joinSpecificChatRepository(chatId);
      return result;
  } catch (error) {
    throw error;
  }
}

//export 
export {
    joinSpecificChatService
}