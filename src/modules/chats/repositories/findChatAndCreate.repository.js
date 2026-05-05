import Chat from '../models/chat.model.js';

const findChatByIdAndCreateRepository = async (ids, currentUser) => {
  try {
    const chat = await Chat.findById(ids.finalChatId);

    if (!chat) {
      throw new Error(
        `No chat found for id "${ids.finalChatId}". ` +
        'Create a new inquiry first — the chat is auto-created at that point.'
      );
    }

    return chat;
  } catch (error) {
    throw error;
  }
};

export { findChatByIdAndCreateRepository };
