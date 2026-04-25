// External modules

// Internal modules
import { findChatByIdAndCreateRepository } from "../repositories/findChatAndCreate.repository.js";
import { saveMessageInDBRepository } from "../repositories/saveMessage.respository.js";
import { upateChatRepository } from "../repositories/updateChat.repository.js";
import { findUserOrAdminRepository } from "../repositories/findUserOrAdmin.repository.js";
const chatService = async (socket, data = {}) => {
  try {
    console.log(
      "We are in the chat service and we check the chatId ",
      socket.chatId,
    );
    console.log("We are in the chat service and we check the data ", data);
    const userOrAdminData = await findUserOrAdminRepository(data.userId);
    console.log("We are in the chat service and we check the user or admin data ", userOrAdminData);
    
    // Store user info from middleware (or create mock for testing)
    const currentUser = socket.user || {
      id: socket.id,
      type: userOrAdminData.role,
      name: userOrAdminData.name,
      email: userOrAdminData.email
    };

    const userId = currentUser?.id;
    const userType = currentUser?.type || "user";

    //Extract data
    const { chatId, message, userId: clientUserId, AdminId } = data;

    // Determine chatId (could be in data or from socket)
    const finalChatId = chatId || socket.chatId;

    if (!finalChatId || !message) {
      socket.emit("error", { message: "ChatId and message are required" });
      return;
    }
    const ids = {
      userId: userId,
      socketId: socket.id,
      finalChatId: finalChatId,
      clientUserId: clientUserId,
      AdminId: AdminId,
    };
    // Find or create chat document
    const chat = await findChatByIdAndCreateRepository(ids, currentUser);

    // Save message in Database
    const saveMessage = await saveMessageInDBRepository(
      ids,
      currentUser,
      chat,
      userType,
      message,
    );

    console.log(`Setting up chat events for ${userType}: ${userId}`);

    const updateChat = await upateChatRepository(finalChatId, message, saveMessage.sender) 

    // Prepare response data
    const responseData = {
      _id: saveMessage._id,
      chatId: finalChatId,
      message: message,
      sender: saveMessage.sender,
      receiver: saveMessage.receiver,
      createdAt: saveMessage.createdAt,
      status: "sent",
    };

    return responseData;
  } catch (error) {
    throw error;
  }
};

//export
export { chatService };
