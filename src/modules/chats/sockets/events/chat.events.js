//External modules

//Internal modules
import Message from "../../models/chatMessage.model.js";
import Chat from "../../models/chat.model.js";
import { chatService } from "../../services/sendMessage.service.js";
import { findChatsService } from "../../services/getActiveChats.service.js";
import { getActiveChatsService } from "../../services/getChatHistory.service.js";
import { joinSpecificChatService } from "../../services/joinSpecificChat.service.js";

export const registerChatEvents = async (io, socket) => {
  //JOIN CHAT ROOM (Simple version for testing)
  socket.on("join_chat", (chatId) => {
    if (!chatId) {
      console.error("No chatId provided for join_chat");
      return;
    }

    socket.join(chatId);
    socket.chatId = chatId;
    console.log(`Socket ${socket.id} joined chat room: ${chatId}`);

    // Notify room that user joined
    socket.to(chatId).emit("receive_message", {
      sender: "system",
      message: `User joined the chat`,
      timestamp: new Date().toISOString(),
      chatId: chatId,
    });
  });

  // SEND MESSAGE (Works with both simple and advanced)
  socket.on("send_message", async (data) => {
    try {
      console.log("Raw message received:", data);
      const responseData = await chatService(socket, data);

      // Emit to everyone in the room (including sender)
      io.to(responseData.chatId).emit("receive_message", responseData);

      // Also emit to sender for confirmation
      socket.emit("message_sent", responseData);

      console.log(
        `Message sent from ${responseData.sender.type} in chat ${responseData.chatId}`,
      );
    } catch (error) {
      socket.emit("error", { message: error.message });
    }
  });

  //GET ACTIVE CHATS (For admin dashboard)
  socket.on("get_active_chats", async () => {
    try {
      const chatRooms = await findChatsService();

      socket.emit("active_rooms", chatRooms);
      console.log(`Sent ${chatRooms.length} active chats to admin`);
    } catch (error) {
      console.error("Error getting active chats:", error);
    }
  });

  // GET CHAT HISTORY
  socket.on("get_chat_history", async (data) => {
    try {
      const { chatId, limit = 50 } = data;

      const messages = await getActiveChatsService(chatId);

      socket.emit("chat_history", {
        chatId: chatId,
        messages: messages,
        total: messages.length,
      });

      console.log(`Sent ${messages.length} messages for chat ${chatId}`);
    } catch (error) {
      console.error("Error getting history:", error);
      socket.emit("error", { message: error.message });
    }
  });

  // JOIN SPECIFIC CHAT ROOM
  socket.on("join_specific_chat", async (chatId) => {
    try {
      socket.join(chatId);
      socket.currentChatId = chatId;
      console.log(`Socket ${socket.id} joined chat: ${chatId}`);

      // Send chat history
      const messages = await joinSpecificChatService(chatId);

      socket.emit("chat_history", {
        chatId: chatId,
        messages: messages,
      });
    } catch (error) {
      console.error("Error joining chat:", error);
    }
  });

  //Disconnect handler
  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
};
