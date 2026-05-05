import { chatService } from "../../services/sendMessage.service.js";
import { findChatsService } from "../../services/getActiveChats.service.js";
import { getActiveChatsService } from "../../services/getChatHistory.service.js";
import { joinSpecificChatService } from "../../services/joinSpecificChat.service.js";
import { markMessagesReadRepository } from "../../repositories/markMessagesRead.repository.js";
import { notificationServices } from "../../../notification/services/notification.service.js";
import User from "../../../user/models/user.model.js";

const inquiryTypeToNotificationType = {
  dovra: 'Dovra',
  buyACar: 'Buy Car',
  carWash: 'Car Wash',
  rentACarInquiry: 'Rent a Car',
};

export const registerChatEvents = async (io, socket) => {
  socket.on("join_chat", (chatId) => {
    if (!chatId) return;
    socket.join(chatId);
    socket.chatId = chatId;
    socket.to(chatId).emit("receive_message", {
      sender: "system",
      message: "User joined the chat",
      timestamp: new Date().toISOString(),
      chatId,
    });
  });

  socket.on("send_message", async (data) => {
    try {
      const { responseData, chat } = await chatService(socket, data);

      io.to(responseData.chatId).emit("receive_message", responseData);
      socket.emit("message_sent", responseData);

      // Increment unread counter on chat for the receiver
      const senderType = responseData.sender?.type;
      if (senderType === 'user') {
        const { default: Chat } = await import("../../models/chat.model.js");
        await Chat.findByIdAndUpdate(responseData.chatId, { $inc: { adminUnreadCount: 1 } });
      } else {
        const { default: Chat } = await import("../../models/chat.model.js");
        await Chat.findByIdAndUpdate(responseData.chatId, { $inc: { userUnreadCount: 1 } });
      }

      // Create notification for the receiver
      if (chat?.inquiryType) {
        const notifType = inquiryTypeToNotificationType[chat.inquiryType] || 'General';
        const senderName = responseData.sender?.name || 'Someone';

        if (senderType === 'user') {
          // Notify admin
          await notificationServices({
            name: senderName,
            type: notifType,
            message: `${senderName} sent a new message`,
            referenceId: chat._id,
            recipientType: 'admin',
          });
        } else {
          // Notify user
          await notificationServices({
            name: senderName,
            type: notifType,
            message: `New message from Admin`,
            referenceId: chat._id,
            recipientId: chat.user?.id,
            recipientType: 'user',
          });
        }
      }
    } catch (error) {
      socket.emit("error", { message: error.message });
    }
  });

  socket.on("get_active_chats", async () => {
    try {
      const chatRooms = await findChatsService();
      socket.emit("active_rooms", chatRooms);
    } catch (error) {
      console.error("Error getting active chats:", error);
    }
  });

  socket.on("get_chat_history", async (data) => {
    try {
      const { chatId } = data;
      const messages = await getActiveChatsService(chatId);
      socket.emit("chat_history", { chatId, messages, total: messages.length });
    } catch (error) {
      socket.emit("error", { message: error.message });
    }
  });

  // JOIN SPECIFIC CHAT — sends history and marks existing messages as read for the joining user
  socket.on("join_specific_chat", async (data) => {
    try {
      // Accept either a plain chatId string or an object { chatId, userId, userType }
      const chatId = typeof data === 'string' ? data : data?.chatId;
      const userId = typeof data === 'object' ? data?.userId : null;
      const userType = typeof data === 'object' ? data?.userType : null;

      if (!chatId) return;

      socket.join(chatId);
      socket.currentChatId = chatId;

      const messages = await joinSpecificChatService(chatId);
      socket.emit("chat_history", { chatId, messages });

      // Mark messages as read for the joining user if userId provided
      if (userId && userType) {
        await markMessagesReadRepository(chatId, userId, userType);
      }
    } catch (error) {
      console.error("Error joining chat:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
};
